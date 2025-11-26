import { useLocalSearchParams } from 'expo-router';
import { default as React, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../../../components/transport/BackButton';
import BottomSheet from '../../../components/transport/BottomSheet';
import MapViewComponent from '../../../components/transport/MapViewComponent';
import Checklist from '../../../components/ui/Checklist';
import IncidentModal from '../../../components/ui/IncidentModal';
import QRModal from '../../../components/ui/QRModal';
import SignatureModal from '../../../components/ui/SignatureModal';

export default function InformacionEnvio() {
  
    const { id_asignacion } = useLocalSearchParams<{ id_asignacion: string }>();
    const [envio, setEnvio] = useState<any>(null);
    const [region, setRegion] = useState<any | null>(null);
    const [ruta, setRuta] = useState<any[]>([]);

    // UI states
    const [showSignature, setShowSignature] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [showIncidents, setShowIncidents] = useState(false);
    const [showConditionsModal, setShowConditionsModal] = useState(false);
    const [showCondListModal, setShowCondListModal] = useState(false);
    const [showChecklistCompleteModal, setShowChecklistCompleteModal] = useState(false);
    const [showFinishModal, setShowFinishModal] = useState(false);
    const [showQRNeededModal, setShowQRNeededModal] = useState(false);

    // domain states (simulados, no llamadas a API)
    const [firmaTransportista, setFirmaTransportista] = useState(false);
    const [firmaCliente, setFirmaCliente] = useState(false);
    const [firma, setFirma] = useState<string | null>(null);

    const [conditions, setConditions] = useState<Record<string, boolean | null>>({});
    const [observaciones, setObservaciones] = useState('');
    const [incidentsAnswers, setIncidentsAnswers] = useState<Record<string, boolean | null>>({});
    const [descripcionIncidente, setDescripcionIncidente] = useState('');

    const [infoMsg, setInfoMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showConditionsAlert, setShowConditionsAlert] = useState(false);
    const [showChecklistIncompleteAlert, setShowChecklistIncompleteAlert] = useState(false);
    const [showFirmaTransportistaNeeded, setShowFirmaTransportistaNeeded] = useState(false);

    const [qrImg, setQrImg] = useState<string | null>(null);
    const [stopPolling, setStopPolling] = useState<(() => void) | null>(null);

    // Sample data (no API)
    const SAMPLE: any = {
      id_asignacion: id_asignacion || '123',
      id_envio: 334,
      estado: 'Pendiente',
      estado_envio: 'Pendiente',
      coordenadas_origen: [-17.7833, -63.1821],
      coordenadas_destino: [-17.7980, -63.1610],
      rutaGeoJSON: { coordinates: [[-63.1821, -17.7833], [-63.1610, -17.7980]] },
      nombre_origen: 'Origen demo',
      nombre_destino: 'Destino demo',
      tipo_transporte: 'Camión',
      cargas: [{ variedad: 'Maíz', peso: 1200, cantidad: 10 }],
    };

    useEffect(() => {
      // inicializar datos
      setEnvio(SAMPLE);
      setRegion({ latitude: SAMPLE.coordenadas_origen[0], longitude: SAMPLE.coordenadas_origen[1], latitudeDelta: 0.05, longitudeDelta: 0.05 });
      setRuta(SAMPLE.rutaGeoJSON.coordinates.map((c: any) => ({ latitude: c[1], longitude: c[0] })));

      const init = (keys: string[]) => Object.fromEntries(keys.map(k => [k, null]));
      setConditions(init([
        'temperatura_controlada','embalaje_adecuado','carga_segura','vehiculo_limpio',
        'documentos_presentes','ruta_conocida'
      ]));
      setIncidentsAnswers(init([
        'retraso','problema_mecanico','accidente','perdida_carga','condiciones_climaticas_adversas'
      ]));
    }, [id_asignacion]);

    // auto-dismiss messages
    useEffect(() => { if (infoMsg) { const t = setTimeout(() => setInfoMsg(''), 2500); return () => clearTimeout(t); } }, [infoMsg]);
    useEffect(() => { if (errorMsg) { const t = setTimeout(() => setErrorMsg(''), 3500); return () => clearTimeout(t); } }, [errorMsg]);

    const allAnswered = (obj: Record<string, boolean | null>) => Object.values(obj).every(v => v !== null);

    // Simula obtener QR y comenzar "polling" que marca firmaCliente = true
    const openQRModal = () => {
      setQrImg(null);
      setShowQR(true);
      setInfoMsg('Generando QR…');

      // simula llamada y luego imagen
      const t1 = setTimeout(() => {
        setQrImg('https://via.placeholder.com/300.png?text=QR+SIMULADO');
        setInfoMsg('QR listo, esperando firma del cliente...');
      }, 700);

      // iniciar polling simulado que detecta la firma del cliente en 4s
      const intervalo = setInterval(() => {
        // en un app real verificarías la API; aquí simulamos
        setFirmaCliente(true);
        setInfoMsg('Firma del cliente verificada ✔');
        clearInterval(intervalo);
      }, 4000);

      setStopPolling(() => () => {
        clearInterval(intervalo);
        clearTimeout(t1);
        setInfoMsg('');
      });
    };

    // cerrar QR
    const closeQR = () => {
      stopPolling?.();
      setShowQR(false);
    };

    // manejar firma transportista (se recibe base64 por SignatureModal)
    const handleGuardarFirma = (signatureBase64?: string) => {
      const s = signatureBase64 || firma;
      if (!s) { setErrorMsg('Firma vacía'); return; }
      setFirma(s);
      setFirmaTransportista(true);
      setInfoMsg('Firma transportista guardada');
    };

    // confirmar inicio de viaje (checklist de condiciones)
    const handleConfirmTrip = () => {
      if (!allAnswered(conditions)) { setShowConditionsAlert(true); return; }
      // simulamos guardado
      setShowCondListModal(true);
      setShowConditionsModal(false);
      setInfoMsg('Checklist de condiciones registrado');
    };

    // finalizar viaje
    const handleFinalizarViaje = () => {
      if (!allAnswered(incidentsAnswers)) { setShowChecklistIncompleteAlert(true); return; }
      if (!firmaCliente) { setShowQRNeededModal(true); return; }
      if (!firmaTransportista) { setShowFirmaTransportistaNeeded(true); return; }

      // simulamos finalización
      setShowFinishModal(true);
    };

    if (!region || !envio) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <ActivityIndicator size="large" color="#0140CD" />
          <Text style={{ marginTop: 8, color: '#4b5563' }}>Cargando…</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <BackButton />

        <MapViewComponent
          region={region}
          origin={{ latitude: envio.coordenadas_origen[0], longitude: envio.coordenadas_origen[1] }}
          destination={{ latitude: envio.coordenadas_destino[0], longitude: envio.coordenadas_destino[1] }}
          ruta={ruta}
        />

        <BottomSheet
          minHeight={125}
          maxHeight={Math.round(Dimensions.get('window').height * 0.85)}
          summary={(
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ color: '#0140CD', fontWeight: '700', fontSize: 18 }}>Envío #{envio.id_envio}</Text>
              </View>
              <Text style={{ color: '#6b7280' }}>{envio.estado || envio.estado_envio}</Text>
            </>
          )}
        >
          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
            {/* Inline alert cards (render inside bottom sheet to stay above map) */}
            {showConditionsAlert && (
              <View style={styles.inlineCard}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#0140CD', marginBottom: 6 }}>Registro de Condiciones</Text>
                <Text style={{ color: '#374151', marginBottom: 12 }}>Debes completar el registro de condiciones de transporte antes de iniciar el viaje.</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setShowConditionsAlert(false)} style={{ backgroundColor: '#9ca3af', padding: 10, borderRadius: 8, marginRight: 8 }}>
                    <Text style={{ color: '#fff' }}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setShowConditionsAlert(false); setShowConditionsModal(true); }} style={{ backgroundColor: '#0140CD', padding: 10, borderRadius: 8 }}>
                    <Text style={{ color: '#fff' }}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {showChecklistIncompleteAlert && (
              <View style={styles.inlineCard}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#dc2626', marginBottom: 6 }}>Checklist Incompleto</Text>
                <Text style={{ color: '#374151', marginBottom: 12 }}>Debes completar todo el checklist de incidentes antes de confirmar.</Text>
                <TouchableOpacity onPress={() => setShowChecklistIncompleteAlert(false)} style={{ backgroundColor: '#0140CD', padding: 10, borderRadius: 8 }}>
                  <Text style={{ color: '#fff' }}>Entendido</Text>
                </TouchableOpacity>
              </View>
            )}

            {showQRNeededModal && (
              <View style={styles.inlineCard}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#0140CD', marginBottom: 6 }}>Firma del Cliente Requerida</Text>
                <Text style={{ color: '#374151', marginBottom: 12 }}>El cliente debe escanear el QR para firmar el documento y así poder finalizar el viaje.</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setShowQRNeededModal(false)} style={{ backgroundColor: '#9ca3af', padding: 10, borderRadius: 8, marginRight: 8 }}>
                    <Text style={{ color: '#fff' }}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setShowQRNeededModal(false); openQRModal(); }} style={{ backgroundColor: '#0140CD', padding: 10, borderRadius: 8 }}>
                    <Text style={{ color: '#fff' }}>Mostrar QR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {showFirmaTransportistaNeeded && (
              <View style={styles.inlineCard}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#0140CD', marginBottom: 6 }}>Firma del Transportista</Text>
                <Text style={{ color: '#374151', marginBottom: 12 }}>Necesitamos la firma del transportista para validar que se entregó el pedido.</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setShowFirmaTransportistaNeeded(false)} style={{ backgroundColor: '#9ca3af', padding: 10, borderRadius: 8, marginRight: 8 }}>
                    <Text style={{ color: '#fff' }}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setShowFirmaTransportistaNeeded(false); setShowSignature(true); }} style={{ backgroundColor: '#0140CD', padding: 10, borderRadius: 8 }}>
                    <Text style={{ color: '#fff' }}>Firmar ahora</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <Text style={{ color: '#000', fontSize: 16, fontWeight: '700', marginBottom: 8 }}>Asignación Nº {envio.id_asignacion}</Text>
            <Text style={{ color: '#000', fontSize: 14, marginBottom: 6 }}>Origen: {envio.nombre_origen}</Text>
            <Text style={{ color: '#000', fontSize: 14, marginBottom: 6 }}>Destino: {envio.nombre_destino}</Text>

            {/* Condiciones */}
            {(envio.estado?.toLowerCase() === 'pendiente') && (
              <View style={{ marginTop: 12 }}>
                {!showConditionsModal ? (
                  <>
                    <TouchableOpacity onPress={() => setShowConditionsModal(true)} style={{ backgroundColor: '#0140CD', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 8 }}>
                      <Text style={{ color: '#fff', fontWeight: '700' }}>Registro de condiciones de Transporte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { if (allAnswered(conditions)) handleConfirmTrip(); else setShowConditionsAlert(true); }} style={{ backgroundColor: '#0140CD', padding: 14, borderRadius: 12, alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontWeight: '700' }}>Iniciar viaje</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={{ color: '#0140CD', fontSize: 16, fontWeight: '700', marginBottom: 8 }}>Registro de condiciones</Text>
                    <Checklist items={[ 'temperatura_controlada','embalaje_adecuado','carga_segura','vehiculo_limpio','documentos_presentes' ]} onChange={(a)=>setConditions(a)} />
                    <TouchableOpacity onPress={handleConfirmTrip} style={{ backgroundColor: '#0140CD', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 }}>
                      <Text style={{ color: '#fff', fontWeight: '700' }}>Confirmar viaje</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}

            {/* Incidentes + firma */}
            {(envio.estado?.toLowerCase() === 'en curso' || envio.estado?.toLowerCase() === 'parcialmente entregado') && (
              <View style={{ marginTop: 18 }}>
                <TouchableOpacity onPress={() => setShowIncidents(true)} style={{ backgroundColor: '#0140CD', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Registro de incidentes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFinalizarViaje} style={{ backgroundColor: '#0140CD', padding: 14, borderRadius: 12, alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Finalizar Viaje</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ marginTop: 18, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setShowSignature(true)} style={{ paddingHorizontal: 8 }}>
                  <Text style={{ color: '#0140CD' }}>{firmaTransportista ? 'Ya firmó' : 'Firmar'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openQRModal} style={{ paddingHorizontal: 8 }}>
                  <Text style={{ color: '#0140CD' }}>Mostrar QR</Text>
                </TouchableOpacity>
              </View>

              <Text style={{ color: '#000', marginTop: 10 }}>Firma transportista:</Text>
              {firma ? (
                <Image source={{ uri: firma }} style={{ width: 160, height: 80, marginTop: 8 }} />
              ) : (
                <Text style={{ color: '#6b7280', marginTop: 8 }}>{firmaTransportista ? 'Registrada' : 'Aún no firmó'}</Text>
              )}
            </View>
          </ScrollView>
        </BottomSheet>

        {/* modals locales */}
        <SignatureModal visible={showSignature} onClose={() => setShowSignature(false)} onConfirm={(s) => { handleGuardarFirma(s); setShowSignature(false); }} />
        <QRModal visible={showQR} onClose={closeQR} qrImage={qrImg} />
        <IncidentModal visible={showIncidents} onClose={() => setShowIncidents(false)} onConfirm={(a, d) => { setIncidentsAnswers(a); setDescripcionIncidente(d); setShowIncidents(false); setInfoMsg('Checklist de incidentes guardado'); }} />

        {/* pequeños toasts */}
        {infoMsg !== '' && (
          <View style={styles.toastInfo}><Text style={{ color: '#0140CD' }}>{infoMsg}</Text></View>
        )}
        {errorMsg !== '' && (
          <View style={styles.toastError}><Text style={{ color: '#b91c1c' }}>{errorMsg}</Text></View>
        )}

        {/* modales de confirmación */}
        {/* Condiciones registradas */}
        {showCondListModal && (
          <View style={styles.centeredOverlay}>
            <View style={styles.modalBox}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#16a34a' }}>Viaje iniciado con éxito</Text>
              <TouchableOpacity onPress={() => setShowCondListModal(false)} style={{ marginTop: 12, backgroundColor: '#0140CD', padding: 10, borderRadius: 8 }}>
                <Text style={{ color: '#fff' }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Finalizado */}
        {showFinishModal && (
          <View style={styles.centeredOverlay}>
            <View style={styles.modalBox}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#16a34a' }}>¡Envío Finalizado!</Text>
              <TouchableOpacity onPress={() => setShowFinishModal(false)} style={{ marginTop: 12, backgroundColor: '#0140CD', padding: 10, borderRadius: 8 }}>
                <Text style={{ color: '#fff' }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* QR necesario */}
        {showQRNeededModal && (
          <View style={styles.centeredOverlay}>
            <View style={styles.modalBox}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#0140CD' }}>Firma del Cliente Requerida</Text>
              <Text style={{ marginTop: 8, textAlign: 'center' }}>El cliente debe escanear el QR para firmar.</Text>
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <TouchableOpacity onPress={() => setShowQRNeededModal(false)} style={{ marginRight: 8, backgroundColor: '#9ca3af', padding: 10, borderRadius: 8 }}>
                  <Text style={{ color: '#fff' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setShowQRNeededModal(false); openQRModal(); }} style={{ backgroundColor: '#0140CD', padding: 10, borderRadius: 8 }}>
                  <Text style={{ color: '#fff' }}>Mostrar QR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: { flex: 1 },
  toastInfo: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 120,
    padding: 12,
    backgroundColor: '#ebf8ff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  toastError: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 120,
    padding: 12,
    backgroundColor: '#fff5f5',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  centeredOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    alignItems: 'center',
  }
  ,
  inlineCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 6,
  }
});
