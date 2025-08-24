import { IconSymbol } from '@/components/ui/IconSymbol';
import { t } from '@/utils/translations';
import { Camera, CameraView } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Alert, FlatList, Image, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCamera } from './_layout';

export default function HomeScreen() {
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showObjectModal, setShowObjectModal] = useState(false);
  const [recognizedObject, setRecognizedObject] = useState<{
    name: string;
    confidence: number;
    description: string;
    recyclingInfo: string;
    source: string;
  } | null>(null);
  const [mockResultIndex, setMockResultIndex] = useState(0);

  const countries = [
    { label: `🇺🇸 ${t('usa')}`, value: 'usa' },
    { label: `🇰🇷 ${t('korea')}`, value: 'korea' },
  ];

  const mockResults = [
    {
      name: t('pringles_can'),
      confidence: 0.95,
      description: t('pringles_can'),
      recyclingInfo: t('recycle_pringles_can'),
      source: 'https://www.pringles.com/uk/recycle-me.html',
    },
    {
      name: t('coat_hanger'),
      confidence: 0.91,
      description: t('coat_hanger'),
      recyclingInfo: t('recycle_coat_hanger'),
      source: 'https://earth911.com/recycling-guide/how-to-recycle-wire-hangers/',
    },
    {
      name: t('umbrella'),
      confidence: 0.91,
      description: t('umbrella'),
      recyclingInfo: t('recycle_umbrella'),
      source: 'https://recyclenation.com/2015/06/how-to-recycle-umbrellas/',
    },
  ];
  const cameraRef = useRef<any>(null);
  const { setIsCameraVisible } = useCamera();

  const selectedCountryLabel = countries.find(country => country.value === selectedCountry)?.label || 'Select a Country';

  const handleCountrySelect = (value: string) => {
    setSelectedCountry(value);
    setIsDropdownVisible(false);
  };

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    return status === 'granted';
  };

  const handleScanItem = async () => {
    const hasPermission = await requestCameraPermission();
    
    if (hasPermission) {
      setShowCamera(true);
      setIsCameraVisible(true);
    } else {
      Alert.alert(
        'Camera Permission Required',
        'Please grant camera permission to scan items.',
        [{ text: 'OK' }]
      );
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setCapturedImage(photo.uri);
        setShowCamera(false);
        setIsCameraVisible(false);
        
        // Simulate object recognition (replace with actual AI integration)
        await processImageWithAI(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  // Reusable function to process image with AI (placeholder for future integration)
  const processImageWithAI = async (imageUri: string) => {
    try {
      const delay = Math.floor(Math.random() * (3500 - 1000 + 1)) + 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      const result = mockResults[mockResultIndex];
      setRecognizedObject(result);
      setShowObjectModal(true);
      setMockResultIndex((mockResultIndex + 1) % mockResults.length);
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert(t('error'), 'Failed to take picture. Please try again.');
    }
  };

  const closeObjectModal = () => {
    setShowObjectModal(false);
    setRecognizedObject(null);
  };

  const cancelCamera = () => {
    setShowCamera(false);
    setIsCameraVisible(false);
  };

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
        />
        <View style={styles.cameraControls}>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelCamera}>
            <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={require('../../assets/images/recyclopedia-logo.png')} style={{ width: 100, height: 100 }} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Recyclopedia</Text>
      <View style={styles.imageContainer}>
        <Image 
          source={capturedImage ? { uri: capturedImage } : { uri: 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg' }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleScanItem}>
        <Text style={styles.buttonText}>{t('scan_item')}</Text>
      </TouchableOpacity>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>{t('select_country')}</Text>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setIsDropdownVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedCountryLabel}</Text>
          <IconSymbol name="chevron.right" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedCountry === item.value && styles.selectedOption
                  ]}
                  onPress={() => handleCountrySelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedCountry === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showObjectModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeObjectModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeObjectModal}
        >
          <View style={styles.objectModalContent}>
            <View style={styles.objectModalHeader}>
              <Text style={styles.objectModalTitle}>{t('object_recognized')}</Text>
              <TouchableOpacity onPress={closeObjectModal}>
                <IconSymbol name="xmark.circle.fill" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {recognizedObject && (
              <View style={styles.objectModalDetails}>
                <View style={styles.objectModalHeader}>
                  <Text style={styles.objectModalName}>{recognizedObject.name}</Text>
                  <Text style={styles.objectModalCountry}>{selectedCountryLabel}</Text>
                </View>
                <Text style={styles.objectModalConfidence}>
                  {t('confidence')}: {Math.round(recognizedObject.confidence * 100)}%
                </Text>
                <Text style={styles.objectModalDescription}>
                  {recognizedObject.description}
                </Text>
                <Text style={styles.objectModalRecyclingInfo}>
                  {t(`${recognizedObject.recyclingInfo}_${selectedCountry}`)}
                </Text>
                {recognizedObject.source && (
                  <TouchableOpacity onPress={() => Linking.openURL(recognizedObject.source)}>
                    <Text style={{ color: '#007AFF', textAlign: 'center', marginTop: 10, textDecorationLine: 'underline' }}>
                      {t('source')}: {recognizedObject.source}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
  },
  cancelButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#007AFF',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
  },
  iconContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 30,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 300,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  dropdownContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: '100%',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    maxHeight: 200,
  },
  objectModalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxWidth: 350,
    maxHeight: 400,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: '600',
  },
  objectModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  objectModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  objectModalDetails: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  objectModalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  objectModalConfidence: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  objectModalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  objectModalRecyclingInfo: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  objectModalCountry: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
