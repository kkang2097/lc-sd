const DesignPrompt: React.FC = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-1/3 w-full">
      <h2 className="text-xl font-semibold text-gray-800">Design Prompt</h2>
      <p className="mt-2 text-gray-600">Design a distributed cache system like Redis or Memcached that can handle high throughput and provide low latency access to frequently accessed data.</p>
    </div>
  );
};

export default DesignPrompt;
