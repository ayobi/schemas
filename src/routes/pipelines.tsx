import { useState } from 'react';
import jsYaml from 'js-yaml';
import data from '../../list.json'; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Select from 'react-select';


interface YamlData {
  data: string;
}
interface YamlDescData {
  description: string;
}

const options = Object.entries(data)
  .filter(([key]) => key.startsWith('pipelines/'))
  .map(([key, value]) => ({
    label: key,
    value: key,
    url: value.url,
    description: value.description
  }));


const TemplateList = () => {
  const [yamlData, setYamlData] = useState<YamlData | null>(null);
  const [yamlDescData, setYamlDescData] = useState<YamlDescData | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = async (selectedOption: any) => {
    try {
      const fullUrl = `https://schema.databio.org/${selectedOption.url}`;
      const response = await fetch(fullUrl);
      const yamlContent = await response.text();
      const parsedYaml = jsYaml.load(yamlContent) as YamlData;
      setYamlData(parsedYaml);
      setYamlDescData(selectedOption.description);
    } catch (error) {
      console.error('Error loading YAML file:', error);
    }
  };

  const yamlString = JSON.stringify(yamlData, null, 2);
  const yamlDescString = JSON.stringify(yamlDescData, null, 2);

  return (
    <div>
      <div>
        <h1>Pipeline Templates</h1>
        <h3>Search below to find templates that belong to Pipelines</h3>
      </div>
      <div>
        <Select
          options={options}
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
          {yamlString !== 'null' && ( 
            <>
              <span className="label">Description:  </span>{yamlDescString}
              <SyntaxHighlighter language="yaml" style={coldarkCold} showLineNumbers={true}>
                {yamlString}
              </SyntaxHighlighter>
            </>
          )}
      </div>
    </div>
  );
};

export default TemplateList;
