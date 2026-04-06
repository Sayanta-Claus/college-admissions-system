import { useEffect, useState } from 'react';
import api from '../services/api';
import { Award, Clock, XCircle } from 'lucide-react';

const ResultPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const { data } = await api.get('/student/result');
        setResult(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load result. Please fill your profile first.');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, []);

  if (loading) return <div className="text-center py-10">Loading results...</div>;

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
        <h2 className="text-red-700 font-bold mb-2">Notice</h2>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 border-b p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Allocation Status</h1>
          <p className="text-gray-500 text-sm mt-1">Based on Merit Round 1</p>
        </div>

        <div className="p-8 flex flex-col items-center text-center">
          {result?.status === 'allocated' ? (
            <>
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-green-600 mb-2">Congratulations!</h2>
              <p className="text-gray-600 mb-6">You have been allocated a seat in your preferred department.</p>
              
              <div className="bg-gray-50 w-full p-4 rounded-xl border border-gray-200">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Allocated Department</div>
                <div className="text-xl font-bold text-gray-900">{result.allocatedDepartment?.name}</div>
                <div className="mt-4 flex justify-between px-8 text-sm">
                  <span className="text-gray-500">Your Score Used:</span>
                  <span className="font-semibold">{result.totalScore}</span>
                </div>
              </div>
            </>
          ) : result?.status === 'rejected' ? (
            <>
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <XCircle className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Allocated</h2>
              <p className="text-gray-600 max-w-sm">Unfortunately, based on the cutoff and seat availability, we could not allocate a seat in your preferred departments at this time.</p>
              <div className="mt-6 text-sm font-medium">Your Score: {result.totalScore}</div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pending Allocation</h2>
              <p className="text-gray-600 max-w-sm">The allocation process has not been run yet. Please check back later.</p>
              <div className="mt-6 text-sm font-medium">Your Registered Score: {result.totalScore}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
