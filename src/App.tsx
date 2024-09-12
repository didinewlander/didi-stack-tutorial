import { AnimatePresence, motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { TypeAnimation } from "react-type-animation"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Textarea } from "./components/ui/textarea"

const chatStateTexts = {
  idle: 'I\'m ready when you are',
  typing: 'Typing...',
  processing: 'Let me think about it',
  response: 'Responding'
}

function App() {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [chatState, setChatState] = useState<"idle" | "typing" | "processing" | "response">("idle");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    setChatState("typing");
  }
  const getResponse = async () => {
    setIsLoading(true);
    if (input.trim() === '') {
      toast('Please enter text message');
    }
    else {
      setResponse(input);
      setChatState("processing")
      // here perform api call to AI model
      await new Promise(resolve => setTimeout(resolve, Math.min(input.length * 50, 3000)))
      setInput('');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (chatState === "typing") {
        setChatState("idle");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [input, chatState]);
  useEffect(() => {
    if (response) {
      setChatState("response");
    }
  }, [response])

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center p-4">
      <Toaster />
      <AnimatePresence>
        <Card className="w-full max-w-md mt-4">
          <CardHeader>
            <CardTitle className="text-center text-3xl">
              Squid Master
            </CardTitle>
            <CardDescription className="py-4">
              Squid Master will help you handle evereything all at once.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center font-bold">
              {chatStateTexts[chatState]}
            </div>
            <Textarea className="min-h-[60px]"
              value={input}
              onChange={handleInputChange}

              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  getResponse();
                }
              }}
              placeholder="Please write a description of your problem..."
            />
            <Button className="w-full" onClick={getResponse} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin "/> :"Send your request to Squid Master"}
            </Button>
            {response && (
              <div className="border-2 border-slate-200 rounded-lg px-4 py-2 pb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={response}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TypeAnimation
                      sequence={[response, () => setChatState("idle")]}
                      wrapper="p"
                      speed={50}
                      className="italic mt-4 text-slate-400 break-words"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

          </CardContent>
        </Card>
      </AnimatePresence>
    </div>
  )
}


export default App