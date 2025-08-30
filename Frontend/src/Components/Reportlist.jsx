import React, { useEffect, useState } from "react";
import axios from "axios";

function ReportsList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reports");
        setReports(res.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesCategory = !filter || report.category.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = !statusFilter || report.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Illegal Logging': return '🪓';
      case 'Pollution': return '☠️';
      case 'Encroachment': return '🏗️';
      case 'Wildlife Poaching': return '🦎';
      case 'Waste Dumping': return '🗑️';
      case 'Unauthorized Construction': return '🚧';
      default: return '⚠️';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading threat reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🌿 Mangrove Threat Reports</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Filter by category..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="pending">⏳ Pending</option>
            <option value="in-progress">🔄 In Progress</option>
            <option value="resolved">✅ Resolved</option>
            <option value="rejected">❌ Rejected</option>
          </select>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredReports.length} of {reports.length} reports
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🌿</div>
          <p className="text-gray-500 text-lg">
            {reports.length === 0 ? "No threats reported yet." : "No reports match your filters."}
          </p>
          <p className="text-gray-400 mt-2">
            {reports.length === 0 ? "Our mangroves are safe for now!" : "Try adjusting your filter criteria."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div key={report._id} className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(report.category)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{report.category}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                        {report.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {report.createdAt && (
                    <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      {formatDate(report.createdAt)}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{report.description}</p>
                
                <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 gap-2">
                  <span className="flex items-center">
                    👤 <strong className="ml-1">{report.userId?.name || 'Anonymous'}</strong>
                  </span>
                  {report.lat && report.lng && (
                    <span className="flex items-center bg-gray-50 px-2 py-1 rounded">
                      📍 {parseFloat(report.lat).toFixed(4)}, {parseFloat(report.lng).toFixed(4)}
                    </span>
                  )}
                </div>
                
                {report.photoUrl && (
                  <div className="mt-4">
                    <img 
                      src={report.photoUrl} 
                      alt="Evidence" 
                      className="w-full h-48 object-cover rounded-lg border shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportsList;