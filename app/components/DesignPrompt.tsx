const DesignPrompt: React.FC = () => {
  const prompt = "Design a distributed cache system like Redis or Memcached that can handle high throughput and provide low latency access to frequently accessed data.";
  const repeatedPrompt = Array(10).fill(prompt).join("\n\n");
  
  return (
    <div className="rounded-lg border border-gray-200 min-h-80 max-h-85 w-full flex flex-col">
      <div className="bg-light-medium rounded-t-lg p-4">
        <h2 className="text-medium text-gray-800">Design Prompt</h2>
      </div>
      <p className="mt-2 text-gray-600 p-2 flex-grow flex-1 overflow-y-auto max-h-[500px]">{repeatedPrompt}</p>
    </div>
  );
};

export default DesignPrompt;
