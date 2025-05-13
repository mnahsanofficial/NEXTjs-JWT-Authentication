// components/ChatInterface.tsx
import { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import {  getRemainingRequests } from '@/utils/api';
import { useAuth } from '../context/AuthContext';
import { getAIResponse } from '@/utils/getAIResponse';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState<number | null>(null);
  const { addNotification } = useNotification();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkRemainingRequests();
    }
  }, [user]);

  const checkRemainingRequests = async () => {
    try {
      const remaining = await getRemainingRequests();
      setRemainingRequests(remaining);
    } catch (error) {
      console.error('Error checking remaining requests:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (remainingRequests !== null && remainingRequests <= 0) {
      addNotification('Daily request limit reached. Try again tomorrow.', 'error');
      return;
    }

    setChatHistory((prev) => [{ role: 'user', content: message },...prev]);
    setIsLoading(true);

    try {
      const { response: aiResponse, remaining } = await getAIResponse(message);
      setChatHistory((prev) => [ { role: 'assistant', content: aiResponse },...prev]);
      setRemainingRequests(remaining);
      addNotification('AI response received', 'success');
      setMessage('');
    } catch (error) {
      if (error.message.includes('limit reached') || error.message.includes('daily limit')) {
        setRemainingRequests(0);
      }
      addNotification(error.message || 'Failed to get AI response', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Chat with AI</h2>

      {remainingRequests !== null && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-md">
          Requests remaining today: {remainingRequests}/5
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Type your message here..."
            disabled={isLoading || (remainingRequests !== null && remainingRequests <= 0)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || (remainingRequests !== null && remainingRequests <= 0)}
          className={`px-4 py-2 rounded-md text-white ${
            isLoading || (remainingRequests !== null && remainingRequests <= 0) 
              ? 'bg-gray-400' 
              : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {isLoading 
            ? 'Processing...' 
            : (remainingRequests !== null && remainingRequests <= 0)
              ? 'Daily Limit Reached'
              : 'Send Message'}
        </button>
      </form>

       {remainingRequests !== 5 && (<div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium text-gray-800 mb-2">Chat History:</h3>
        <div className="space-y-4">
          {chatHistory.map((entry, index) => (
            <div key={index} className="p-2 rounded-md">
              <strong className={entry.role === 'user' ? 'text-blue-600' : 'text-green-600'}>
                {entry.role === 'user' ? 'You' : 'AI'}
              </strong>
              <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      </div>)}
    </div>
  );
};

export default ChatInterface;