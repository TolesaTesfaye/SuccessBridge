import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, StatusBar, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation } from '@tanstack/react-query';
import { aiApi, AIMessage } from '../../api/ai';
import { Colors, Spacing, BorderRadius } from '../../theme';

const QUICK_PROMPTS = [
  'Explain this concept to me',
  'Quiz me on this topic',
  'Summarize what I need to know',
  'Give me practice questions',
];

const MessageBubble: React.FC<{ msg: AIMessage }> = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
      {!isUser && (
        <View style={styles.aiAvatar}>
          <Ionicons name="sparkles" size={14} color={Colors.white} />
        </View>
      )}
      <View style={[styles.bubbleContent, isUser ? styles.userContent : styles.aiContent]}>
        <Text style={[styles.bubbleText, isUser ? styles.userText : styles.aiText]}>
          {msg.content}
        </Text>
      </View>
    </View>
  );
};

export const AICompanionScreen: React.FC = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<AIMessage[]>([
    { role: 'assistant', content: '👋 Hi! I\'m your AI study companion powered by Gemini. How can I help you today? Ask me anything about your studies!' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);

  const chatMutation = useMutation({
    mutationFn: (msgs: AIMessage[]) => aiApi.chat(msgs),
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    },
    onError: () => {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    },
  });

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const newMsg: AIMessage = { role: 'user', content: msg };
    const updatedMsgs = [...messages, newMsg];
    setMessages(updatedMsgs);
    setInput('');
    chatMutation.mutate(updatedMsgs);
  };

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient colors={['#6C63FF', '#8B5CF6']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.aiAvatarLarge}>
            <Ionicons name="sparkles" size={22} color={Colors.white} />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Study Companion</Text>
            <Text style={styles.headerStatus}>Powered by Gemini AI</Text>
          </View>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <View style={styles.quickPromptsSection}>
          <Text style={styles.quickPromptsLabel}>Quick Prompts</Text>
          <View style={styles.quickPrompts}>
            {QUICK_PROMPTS.map((p, i) => (
              <TouchableOpacity key={i} onPress={() => handleSend(p)} style={styles.promptChip}>
                <Text style={styles.promptText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.messagesList}
        renderItem={({ item }) => <MessageBubble msg={item} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Typing indicator */}
      {chatMutation.isPending && (
        <View style={styles.typing}>
          <View style={styles.aiAvatar}>
            <Ionicons name="sparkles" size={14} color={Colors.white} />
          </View>
          <View style={styles.typingDots}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.typingText}>AI is thinking...</Text>
          </View>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask me anything..."
          placeholderTextColor={Colors.textMuted}
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          onPress={() => handleSend()}
          disabled={!input.trim() || chatMutation.isPending}
          style={[styles.sendBtn, (!input.trim() || chatMutation.isPending) && styles.sendBtnDisabled]}
        >
          <LinearGradient
            colors={['#6C63FF', '#8B5CF6']}
            style={styles.sendBtnGradient}
          >
            <Ionicons name="send" size={18} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  header: { paddingTop: 52, paddingBottom: Spacing[4], paddingHorizontal: Spacing[5] },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], flex: 1, marginLeft: Spacing[3] },
  aiAvatarLarge: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Inter_700Bold', fontSize: 16, color: Colors.white },
  headerStatus: { fontFamily: 'Inter_400Regular', fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  quickPromptsSection: { padding: Spacing[5], gap: Spacing[3] },
  quickPromptsLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  quickPrompts: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
  promptChip: {
    backgroundColor: Colors.bgCard, borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing[4], paddingVertical: Spacing[2],
    borderWidth: 1, borderColor: `${Colors.primary}40`,
  },
  promptText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: Colors.primary },
  messagesList: { paddingHorizontal: Spacing[4], paddingVertical: Spacing[4], gap: Spacing[4] },
  bubble: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing[2] },
  userBubble: { justifyContent: 'flex-end' },
  aiBubble: { justifyContent: 'flex-start' },
  aiAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  bubbleContent: { maxWidth: '78%', borderRadius: BorderRadius.xl, padding: Spacing[4] },
  userContent: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  aiContent: { backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border, borderBottomLeftRadius: 4 },
  bubbleText: { fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 22 },
  userText: { color: Colors.white },
  aiText: { color: Colors.textPrimary },
  typing: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], paddingHorizontal: Spacing[5], paddingBottom: Spacing[2] },
  typingDots: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], backgroundColor: Colors.bgCard, paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], borderRadius: BorderRadius.full },
  typingText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: Colors.textMuted },
  inputContainer: {
    flexDirection: 'row', alignItems: 'flex-end', gap: Spacing[2],
    padding: Spacing[4], paddingBottom: 30,
    backgroundColor: Colors.bgCard, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  textInput: {
    flex: 1, backgroundColor: Colors.bgSurface, borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing[4], paddingVertical: Spacing[3],
    fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textPrimary,
    maxHeight: 120, borderWidth: 1, borderColor: Colors.border,
  },
  sendBtn: { borderRadius: BorderRadius.full, overflow: 'hidden' },
  sendBtnDisabled: { opacity: 0.5 },
  sendBtnGradient: { width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
});
