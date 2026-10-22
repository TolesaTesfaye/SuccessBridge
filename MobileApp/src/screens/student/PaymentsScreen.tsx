import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const PaymentsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'exam'>('pro');
  const [selectedMethod, setSelectedMethod] = useState<'telebirr' | 'cbe' | 'chapa'>('telebirr');

  const plans = [
    {
      id: 'free' as const,
      name: 'Basic Free',
      price: '0 ETB',
      duration: 'Forever',
      features: ['Access to sample quizzes', 'Public curriculum notes', 'Standard AI prompts'],
      badge: null,
    },
    {
      id: 'pro' as const,
      name: 'Semester Pass',
      price: '299 ETB',
      duration: 'Per Semester',
      features: [
        'All grade-level PDFs & notes',
        'Unlimited AI Companion tutor',
        'Chapter-by-chapter practice quizzes',
        'Detailed performance analytics',
      ],
      badge: 'POPULAR',
    },
    {
      id: 'exam' as const,
      name: 'National Exam Master',
      price: '499 ETB',
      duration: 'Full Academic Year',
      features: [
        'Past 10-year entrance exam keys',
        'Timed full simulation exams',
        'Predictive score analysis',
        'Direct instructor Q&A sessions',
      ],
      badge: 'BEST VALUE',
    },
  ];

  const handleCheckout = () => {
    if (selectedPlan === 'free') {
      Alert.alert('Basic Plan', 'You are already enjoying the free features!');
      return;
    }

    const planObj = plans.find((p) => p.id === selectedPlan);
    Alert.alert(
      'Proceed with Payment',
      `Upgrade to ${planObj?.name} for ${planObj?.price} via ${selectedMethod.toUpperCase()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Pay',
          onPress: () => {
            Alert.alert(
              'Payment Initiated',
              `Redirecting to ${selectedMethod.toUpperCase()} gateway. Once completed, your account will be instantly upgraded.`
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Subscription Plans</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <View style={styles.heroBox}>
          <Text style={styles.heroTitle}>Unlock Your Full Potential</Text>
          <Text style={styles.heroSub}>
            Get unlimited access to national exam keys, complete subject notes, and the AI study companion.
          </Text>
        </View>

        {/* Plans Carousel/List */}
        <View style={styles.plansList}>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                activeOpacity={0.85}
                onPress={() => setSelectedPlan(plan.id)}
              >
                <Card
                  variant={isSelected ? 'bordered' : 'surface'}
                  style={[styles.planCard, isSelected && styles.planCardSelected]}
                >
                  <View style={styles.planHeader}>
                    <View>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <Text style={styles.planDuration}>{plan.duration}</Text>
                    </View>
                    {plan.badge && (
                      <Badge
                        label={plan.badge}
                        variant={plan.id === 'pro' ? 'primary' : 'accent'}
                      />
                    )}
                  </View>

                  <View style={styles.priceRow}>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                  </View>

                  <View style={styles.featureList}>
                    {plan.features.map((f, i) => (
                      <View key={i} style={styles.featureRow}>
                        <Ionicons name="checkmark-circle" size={16} color={Colors.accent} />
                        <Text style={styles.featureText}>{f}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodRow}>
          {[
            { id: 'telebirr' as const, name: 'Telebirr', icon: 'phone-portrait-outline' as const },
            { id: 'cbe' as const, name: 'CBE Birr', icon: 'card-outline' as const },
            { id: 'chapa' as const, name: 'Chapa / Card', icon: 'globe-outline' as const },
          ].map((m) => {
            const isChosen = selectedMethod === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.methodCard, isChosen && styles.methodCardActive]}
                onPress={() => setSelectedMethod(m.id)}
              >
                <Ionicons
                  name={m.icon}
                  size={20}
                  color={isChosen ? Colors.accent : Colors.textMuted}
                />
                <Text style={[styles.methodName, isChosen && styles.methodNameActive]}>
                  {m.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Button */}
        <View style={styles.footerBtnWrap}>
          <Button
            title={selectedPlan === 'free' ? 'Continue with Free' : 'Upgrade Membership Now'}
            onPress={handleCheckout}
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  scrollContent: {
    paddingTop: 56,
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[10],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing[4],
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: Colors.textPrimary,
  },
  heroBox: {
    alignItems: 'center',
    marginBottom: Spacing[6],
    paddingHorizontal: Spacing[2],
  },
  heroTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing[2],
  },
  heroSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  plansList: {
    gap: Spacing[4],
    marginBottom: Spacing[6],
  },
  planCard: {
    padding: Spacing[5],
  },
  planCardSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: '#1E1B38',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing[2],
  },
  planName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  planDuration: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  priceRow: {
    marginVertical: Spacing[2],
  },
  planPrice: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: Colors.accent,
  },
  featureList: {
    gap: 8,
    marginTop: Spacing[2],
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: Spacing[3],
  },
  methodRow: {
    flexDirection: 'row',
    gap: Spacing[3],
    marginBottom: Spacing[6],
  },
  methodCard: {
    flex: 1,
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[2],
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: 6,
  },
  methodCardActive: {
    borderColor: Colors.accent,
    backgroundColor: `${Colors.accent}15`,
  },
  methodName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.textMuted,
  },
  methodNameActive: {
    color: Colors.textPrimary,
    fontFamily: 'Inter_600SemiBold',
  },
  footerBtnWrap: {
    marginTop: Spacing[2],
  },
});
