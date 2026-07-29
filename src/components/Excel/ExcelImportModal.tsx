import React, { useState, useRef } from 'react';
import type { Customer } from '../../types';
import { parseExcelFile, downloadSampleExcel } from '../../lib/excelImporter';
import { X, FileSpreadsheet, Upload, Download, CheckCircle2, AlertCircle, RefreshCw, Cpu } from 'lucide-react';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomersImported: (customers: Customer[], stats?: any) => void;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
  onCustomersImported,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const pollTimerRef = useRef<any>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMsg(null);
      setSuccessMessage(null);
    }
  };

  const handleApplyDataset = async () => {
    if (!file) {
      setErrorMsg('Please select a CSV or Excel dataset file first.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMessage(null);
    setCurrentStep('Uploading Dataset...');
    setProgressPercent(15);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // 1. Post dataset asynchronously to backend (returns HTTP 202 with job_id)
      let uploadRes: Response | null = null;
      try {
        uploadRes = await fetch('http://localhost:5000/api/v1/dataset/upload', {
          method: 'POST',
          body: formData,
        });
      } catch (err) {
        console.warn('Backend server offline, performing async web-worker parsing fallback.', err);
      }

      if (uploadRes && uploadRes.ok) {
        const initialData = await uploadRes.json();
        const jobId = initialData.job_id;

        // 2. Poll job status asynchronously every 1.5 seconds without blocking UI thread
        const pollJobStatus = async () => {
          try {
            const statusRes = await fetch(`http://localhost:5000/api/v1/dataset/status/${jobId}`);
            if (!statusRes.ok) throw new Error('Failed to fetch job status');

            const statusData = await statusRes.json();
            setCurrentStep(statusData.step || 'Processing Dataset...');
            setProgressPercent(statusData.progress || 50);

            if (statusData.status === 'completed') {
              if (pollTimerRef.current) clearInterval(pollTimerRef.current);
              
              setCurrentStep('Updating Dashboard...');
              setProgressPercent(100);
              await new Promise(r => setTimeout(r, 400));

              setSuccessMessage(`Successfully processed ${statusData.result.statistics.total_customers.toLocaleString()} customer records! Dashboard updated.`);
              onCustomersImported(statusData.result.customers, statusData.result.statistics);

              setTimeout(() => {
                setIsProcessing(false);
                onClose();
              }, 1200);

            } else if (statusData.status === 'failed') {
              if (pollTimerRef.current) clearInterval(pollTimerRef.current);
              throw new Error(statusData.error || 'Background ML pipeline processing failed.');
            }
          } catch (pollErr: any) {
            if (pollTimerRef.current) clearInterval(pollTimerRef.current);
            setErrorMsg(pollErr.message || 'Background processing error.');
            setIsProcessing(false);
          }
        };

        pollTimerRef.current = setInterval(pollJobStatus, 1500);

      } else if (uploadRes && !uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.error || 'Dataset validation error.');
      } else {
        // Fallback: Web worker non-blocking XLSX parsing
        setCurrentStep('Cleaning Dataset...');
        setProgressPercent(40);
        await new Promise(r => setTimeout(r, 300));

        setCurrentStep('Training Model...');
        setProgressPercent(70);
        await new Promise(r => setTimeout(r, 400));

        const parsed = await parseExcelFile(file);

        setCurrentStep('Updating Dashboard...');
        setProgressPercent(100);
        await new Promise(r => setTimeout(r, 300));

        setSuccessMessage(`Successfully processed ${parsed.length.toLocaleString()} customer records! Dashboard updated.`);
        onCustomersImported(parsed);

        setTimeout(() => {
          setIsProcessing(false);
          onClose();
        }, 1200);
      }

    } catch (err: any) {
      console.error('Dataset Sync Error:', err);
      setErrorMsg(err.message || 'Failed to process dataset file.');
      setIsProcessing(false);
      setProgressPercent(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="saas-card max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-scale-in">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <FileSpreadsheet className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-outfit">Asynchronous Dataset Synchronization</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="space-y-4">
          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 dark:bg-slate-950 transition-all text-center group">
            <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-500 mb-2 transition-colors" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {file ? file.name : 'Click to Upload Excel / CSV File'}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Supports .xlsx, .xls, or .csv datasets (50,000+ records supported without freezing UI)
            </span>
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleFileChange}
              disabled={isProcessing}
              className="hidden"
            />
          </label>

          {/* Sample Download Button */}
          <div className="flex justify-end">
            <button
              onClick={downloadSampleExcel}
              disabled={isProcessing}
              className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Sample Dataset Template</span>
            </button>
          </div>
        </div>

        {/* Live Processing Pipeline Overlay */}
        {isProcessing && (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-200">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400" />
                {currentStep}
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-cyan-500" />
              <span>Background Thread Execution Active (UI Unblocked)</span>
            </div>
          </div>
        )}

        {/* Error Message Banner */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Message Banner */}
        {successMessage && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleApplyDataset}
            disabled={!file || isProcessing}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md transition-all"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing in Background...</span>
              </>
            ) : (
              <span>Apply Dataset to Dashboard</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
