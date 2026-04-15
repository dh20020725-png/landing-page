import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendChatMessage } from "@workspace/api-client-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", content: "Hi! I'm the NexaTech assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const chatMutation = useSendChatMessage();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatMutation.isPending]);

  const handleSend = () => {
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMessage }
    ]);

    chatMutation.mutate({ data: { message: userMessage } }, {
      onSuccess: (response) => {
        setMessages(prev => [
          ...prev,
          { id: Date.now().toString(), role: "bot", content: response.reply }
        ]);
      },
      onError: () => {
        setMessages(prev => [
          ...prev,
          { id: Date.now().toString(), role: "bot", content: "Sorry, I'm having trouble connecting to the server right now. Please try again later or use the contact form." }
        ]);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-14 h-14 rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] bg-background border border-border shadow-2xl rounded-2xl flex flex-col z-50 animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
          <div className="p-4 bg-primary text-primary-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">NexaTech Assistant</h3>
              <p className="text-xs text-primary-foreground/80">Online & ready to help</p>
            </div>
          </div>

          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30"
            ref={scrollRef}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.role === "user" 
                    ? "bg-accent text-accent-foreground rounded-tr-sm" 
                    : "bg-card border border-border shadow-sm rounded-tl-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {chatMutation.isPending && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-card border border-border shadow-sm rounded-tl-sm text-sm flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-background border-t border-border flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-full bg-muted/50"
              disabled={chatMutation.isPending}
            />
            <Button 
              size="icon" 
              className="rounded-full shrink-0"
              onClick={handleSend}
              disabled={!inputValue.trim() || chatMutation.isPending}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
