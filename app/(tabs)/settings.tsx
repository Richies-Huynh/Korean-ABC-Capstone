import { useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Language, setLanguage, t } from '@/utils/translations';

const languages = [
  { label: 'English', value: 'english' },
  { label: '한국어', value: 'korean' },
];

export default function SettingsScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const selectedLanguageLabel = languages.find(lang => lang.value === selectedLanguage)?.label || 'English';

  const handleLanguageSelect = (value: string) => {
    const newLanguage = value as Language;
    setSelectedLanguage(newLanguage);
    setLanguage(newLanguage); // Update global language state
    setIsDropdownVisible(false);
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <ThemedText type="title" style={styles.title}>{t('settings')}</ThemedText>
      
      <View style={styles.settingRow}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>{t('language')}</ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setIsDropdownVisible(true)}
        >
          <ThemedText style={styles.dropdownText}>{selectedLanguageLabel}</ThemedText>
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
              data={languages}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedLanguage === item.value && styles.selectedOption
                  ]}
                  onPress={() => handleLanguageSelect(item.value)}
                >
                  <ThemedText style={[
                    styles.optionText,
                    selectedLanguage === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  labelContainer: {
    flex: 1,
    paddingRight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 12,
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
});
