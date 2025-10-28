"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
} from "@/components/ai-elements/prompt-input";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { MessageCircleIcon, XIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useChat, type Message as AIMessage } from "@ai-sdk/react";

const suggestions = [
  "What is TechnoVIT 2025?",
  "Tell me about the events",
  "How can I register?",
  "What is the theme?",
];

interface MiniChatbotProps {
  onClose?: () => void;
}

// Helper function to safely get initial messages from localStorage
const getInitialMessages = (): AIMessage[] => {
  // Check if window is defined to prevent errors during server-side rendering
  if (typeof window === "undefined") {
    return [];
  }
  const savedMessages = localStorage.getItem("technovit-messages");
  if (savedMessages) {
    try {
      // Basic validation to ensure the stored data is an array
      const parsed = JSON.parse(savedMessages);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error loading messages from localStorage:", error);
      return [];
    }
  }
  return [];
};

const MiniChatbot = ({ onClose }: MiniChatbotProps) => {
  const { messages, status, sendMessage, error } = useChat({
    // Load previous messages when the component initializes
    initialMessages: getInitialMessages(),
    onError: (error) => {
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again.");
    },
  });

  const [input, setInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("technovit-messages", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage({
      role: "user",
      content: suggestion,
    });
  };

  const handleFormSubmit = (
    message: PromptInputMessage,
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (message.text?.trim()) {
      sendMessage({
        role: "user",
        content: message.text,
      });
      setInput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex h-[32rem] w-96 flex-col rounded-lg border bg-background shadow-xl">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold">TechnoVIT 2025</h3>
          <p className="text-xs text-muted-foreground">
            Healing with Intelligence
          </p>
        </div>
        <div className="flex items-center space-x-1">
          {onClose && (
            <button
              onClick={onClose}
              className="rounded p-1 transition-colors hover:bg-muted"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {/* The main scrollable message area */}
        <Conversation className="flex flex-1 flex-col min-h-0">
          <ConversationContent
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4"
          >
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <MessageCircleIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                <h4 className="mb-1 text-sm font-medium">Welcome!</h4>
                <p className="text-xs text-muted-foreground">
                  Ask me about TechnoVIT 2025
                </p>
              </div>
            )}

            {messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  <Response className="text-sm">{message.content}</Response>
                </MessageContent>
              </Message>
            ))}

            {status === "streaming" && (
              <Message from="assistant">
                <MessageContent>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"></div>
                    </div>
                  </div>
                </MessageContent>
              </Message>
            )}

            {error && (
              <Message from="assistant">
                <MessageContent>
                  <div className="rounded border border-destructive bg-destructive/10 p-2">
                    <p className="text-xs font-medium text-destructive">
                      Error
                    </p>
                    <p className="text-xs text-destructive">{error.message}</p>
                  </div>
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Suggestions and Input */}
        <div className="flex-shrink-0">
          <div className="border-t px-2 py-1">
            <Suggestions>
              {suggestions.map((suggestion) => (
                <Suggestion
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  suggestion={suggestion}
                  className="text-xs"
                />
              ))}
            </Suggestions>
          </div>
          <div className="border-t p-2">
            <PromptInput onSubmit={handleFormSubmit}>
              <PromptInputBody>
                <PromptInputTextarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about TechnoVIT..."
                  className="resize-none text-sm"
                  rows={1}
                />
              </PromptInputBody>
              <PromptInputFooter className="flex justify-end">
                <PromptInputSubmit
                  disabled={!input.trim() || status === "streaming"}
                  className="h-6 w-6"
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniChatbot;
