
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { IndustryReport } from '../types';

interface IndustryInsightsProps {
  reports: IndustryReport[];
}

const IndustryInsights: React.FC<IndustryInsightsProps> = ({ reports }) => {
  return (
    <div className="bg-steel-card rounded-xl p-4">
      <h3 className="text-xl font-bold mb-3">Industry Insights</h3>
      <div className="space-y-4">
        {reports.map(report => (
          <div key={report.id} className="p-3 bg-steel-highlight/30 rounded-lg hover:bg-steel-highlight transition-all">
            <div className="flex items-start">
              <div className="p-2 bg-steel-background rounded mr-3">
                <FileText size={20} className="text-steel-positive" />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-base">{report.title}</h4>
                <p className="text-gray-400 text-sm">{report.summary}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">{report.date} · {report.source}</span>
                  <a href={report.downloadUrl} className="flex items-center text-steel-positive text-xs">
                    <Download size={14} className="mr-1" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryInsights;
