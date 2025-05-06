const DesignPrompt: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 h-80">
      <div className="bg-light-medium rounded-t-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800">Design Prompt</h2>
      </div>
      <p className="mt-2 text-gray-600">Design a distributed cache system like Redis or Memcached that can handle high throughput and provide low latency access to frequently accessed data.</p>
    </div>
  );
};

export default DesignPrompt;
