'use client';

import { CheckCircle2, Database, FileText, CheckCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Portfolio() {
  const project = {
    title: 'Student Leave Management System',
    client: 'J.N.N. Institute of Engineering',
    category: 'Web Application',
    status: 'Completed',
    description:
      'A web-based Student Leave Management System designed to digitally manage student leave information. Students can submit leave requests along with the reason for leave. Faculty/HOD users can review and manage the submitted leave information. The system can generate relevant leave information as PDF records. The system also includes student database management functionality.',
    databaseFeatures: [
      'Student database management',
      'Add student records',
      'Edit/update student records',
      'Delete student records',
      'Manage student information'
    ],
    workflowSteps: [
      {
        role: 'Student',
        desc: 'Submits leave information, including the specific reason for leave.'
      },
      {
        role: 'Faculty / HOD',
        desc: 'Reviews, tracks, and manages the submitted student leave requests.'
      },
      {
        role: 'PDF Record Keeping',
        desc: 'Generates relevant leave logs and summaries as downloadable PDF records.'
      }
    ]
  };

  return (
    <div className="bg-obsidian text-ivory py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#005BFF]">
          Our Work
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-[#0B0F19]">
          Portfolio
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
          We showcase only real, completed client projects. Below is the official project engineered
          by OSAAC.
        </p>
      </div>

      {/* Featured Project Showcase Card */}
      <div className="p-8 sm:p-12 bg-[#F1F5F9] border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.04)] rounded-xl space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005BFF] block">
              Featured {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B0F19] mt-1">
              {project.title}
            </h2>
          </div>
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-white text-[#005BFF] border border-slate-300">
            <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
            {project.status}
          </span>
        </div>

        {/* Project Context */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#005BFF]">
                Project Overview
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>
            </div>

            {/* Leave Workflow */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#005BFF] flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Leave Workflow System
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.workflowSteps.map((step, idx) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200 rounded-lg space-y-1.5 shadow-sm">
                    <span className="text-[10px] font-mono font-bold text-[#005BFF] uppercase block tracking-wider">
                      {step.role}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Details Panel */}
          <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-6 shadow-sm">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-widest">Client Institution</span>
              <span className="text-sm font-bold text-[#0B0F19] font-display">{project.client}</span>
            </div>

            {/* Student Database Operations */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#005BFF] flex items-center">
                <Database className="mr-1.5 h-4 w-4" />
                Database Operations
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {project.databaseFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#005BFF] rounded-full shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Future Work Note */}
      <div className="p-6 bg-[#F1F5F9] border border-slate-200 rounded-lg text-center text-xs text-slate-600">
        New portfolio projects will be added here as soon as they are completed and deployed.
      </div>
    </div>
  );
}
