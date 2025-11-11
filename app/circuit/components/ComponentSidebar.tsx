"use client";

import { ComponentTemplate } from "../types";
import { useState } from "react";
import { Search } from "lucide-react";
import ResistorIcon from "./ResistorIcon";
import CapacitorIcon from "./CapacitorIcon";
import InductorIcon from "./InductorIcon";
import VoltageSourceIcon from "./VoltageSourceIcon";
import CurrentSourceIcon from "./CurrentSourceIcon";
import GroundIcon from "./GroundIcon";
import NameNodeIcon from "./NameNodeIcon";
import CsvVoltageSourceIcon from "./CsvVoltageSourceIcon";
import VoltageFunctionGeneratorIcon from "./VoltageFunctionGeneratorIcon";
import VoltageStepIcon from "./VoltageStepIcon";
import CurrentFunctionGeneratorIcon from "./CurrentFunctionGeneratorIcon";
import CurrentStepIcon from "./CurrentStepIcon";
import CsvCurrentSourceIcon from "./CsvCurrentSourceIcon";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { componentGroups } from "../data/componentTemplates";

export default function ComponentSidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    template: ComponentTemplate
  ) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(template)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  // 검색 필터링
  const filteredGroups = componentGroups
    .map((group) => ({
      ...group,
      components: group.components.filter((template: ComponentTemplate) =>
        template.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.components.length > 0);

  const renderComponentIcon = (type: string) => {
    switch (type) {
      case "resistor":
        return <ResistorIcon />;
      case "capacitor":
        return <CapacitorIcon />;
      case "inductor":
        return <InductorIcon />;
      case "voltage_source":
        return <VoltageSourceIcon />;
      case "current_source":
        return <CurrentSourceIcon />;
      case "ground":
        return <GroundIcon />;
      case "name_node":
        return <NameNodeIcon />;
      case "csv_voltage_source":
        return <CsvVoltageSourceIcon />;
      case "voltage_function_generator":
        return <VoltageFunctionGeneratorIcon />;
      case "voltage_step":
        return <VoltageStepIcon />;
      case "current_function_generator":
        return <CurrentFunctionGeneratorIcon />;
      case "current_step":
        return <CurrentStepIcon />;
      case "csv_current_source":
        return <CsvCurrentSourceIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto flex flex-col h-full">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Elements</h2>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {filteredGroups.map((group) => (
          <div key={group.name}>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">
              {group.label}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {group.components.map((template: ComponentTemplate) => (
                <Tooltip key={template.type}>
                  <TooltipTrigger asChild>
                    <div
                      draggable
                      onDragStart={(e) => onDragStart(e, template)}
                      className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-move hover:bg-gray-100 hover:border-black transition-all group"
                    >
                      <div className="flex items-center justify-center">
                        {renderComponentIcon(template.type)}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{template.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
