import React, { useState } from 'react';
import type { Customer } from '../../types';
import { parseExcelFile, downloadSampleExcel } from '../../lib/excelImporter';
import { X, FileSpreadsheet, Upload, Download, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomersImported: (customers: Customer[]) => void;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
  onCustomersImported,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<Customer[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setErrorMsg(null);
    setIsProcessing(true);

    try {
      const customers = await parseExcelFile(selectedFile);
      setParsedData(customers);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error processing Excel file.');
      setParsedData(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = () => {
    if (parsedData && parsedData.length > 0) {
      onCustomersImported(parsedData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-zinc-950 w-full max-w-xl rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Dialog Header */}
        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <h2 className="font-semibold text-zinc-100 font-outfit text-base">Import Customer Dataset (Excel / CSV)</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-zinc-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dialog Body */}
        <div className="p-6 space-y-5">
          
          {/* Instructions & Template Download */}
          <div className="flex items-center justify-between bg-zinc-900/80 p-3.5 rounded-lg border border-zinc-800 text-xs">
            <div className="space-y-0.5">
              <span className="font-medium text-zinc-200 block">Need an Excel template format?</span>
              <span className="text-zinc-400">Download our sample dataset to structure your file.</span>
            </div>
            <button
              onClick={downloadSampleExcel}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sample Template</span>
            </button>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl p-8 text-center bg-zinc-900/40 transition-all relative">
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2 pointer-events-none">
              <Upload className="w-8 h-8 text-zinc-400 mx-auto" />
              <div className="text-xs font-medium text-zinc-200">
                {file ? file.name : 'Click or Drag & Drop your Excel file (.xlsx, .csv)'}
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">
                Supports column headers: Customer Name, Email, CLV, Orders, Recency, Cart Abandonments, Tickets
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-center space-x-2 text-xs text-rose-400 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Parsed Preview */}
          {parsedData && (
            <div className="bg-zinc-900/90 p-4 rounded-lg border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Successfully Parsed {parsedData.length} Customers!
                </span>
                <span className="text-zinc-400 font-mono">
                  {parsedData.filter(c => c.riskTier === 'High').length} High Churn Risk
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Churn risk scores and SHAP attributions have been automatically computed for all imported records.
              </p>
            </div>
          )}

        </div>

        {/* Dialog Footer */}
        <div className="bg-zinc-950 px-6 py-3.5 border-t border-zinc-800 flex items-center justify-between text-xs">
          <span className="text-zinc-500 font-mono">
            {isProcessing ? 'Processing Excel file...' : file ? `${file.name}` : 'No file selected'}
          </span>

          <button
            onClick={handleConfirmImport}
            disabled={!parsedData || parsedData.length === 0}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-md font-semibold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>Apply Dataset to Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
};
