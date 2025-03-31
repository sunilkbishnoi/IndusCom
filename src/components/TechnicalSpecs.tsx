
import React from 'react';
import { SteelSpecification } from '../types';

interface TechnicalSpecsProps {
  spec: SteelSpecification;
}

const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ spec }) => {
  return (
    <div className="bg-steel-card rounded-xl p-4">
      <h3 className="text-xl font-bold mb-3">{spec.category} - Grade {spec.grade}</h3>
      
      <div className="mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Physical Properties</h4>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          <div>
            <span className="text-xs text-gray-500">Tensile Strength</span>
            <p className="text-sm font-medium">{spec.properties.tensileStrength}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Yield Strength</span>
            <p className="text-sm font-medium">{spec.properties.yieldStrength}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Elongation</span>
            <p className="text-sm font-medium">{spec.properties.elongation}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Hardness</span>
            <p className="text-sm font-medium">{spec.properties.hardness}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Density</span>
            <p className="text-sm font-medium">{spec.properties.density}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Melting Point</span>
            <p className="text-sm font-medium">{spec.properties.meltingPoint}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Common Applications</h4>
        <div className="flex flex-wrap gap-2">
          {spec.applications.map((app, index) => (
            <span key={index} className="bg-steel-highlight/50 text-xs rounded-full px-2 py-1">
              {app}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm text-gray-400 mb-1">Corrosion Resistance</h4>
        <p className="text-sm">{spec.corrosionResistance}</p>
      </div>
    </div>
  );
};

export default TechnicalSpecs;
