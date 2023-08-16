import { useEffect, useState } from 'react';
import jsYaml from 'js-yaml';
import data from '../../list.json'; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom'; 


interface YamlData {
  data: string;
}
// interface YamlDescData {
//   description: string;
// }



const options = Object.entries(data)
  .filter(([key]) => key.startsWith('refget/'))
  .map(([key, value]) => ({
    label: key.replace('refget/', ''),
    value: key.replace('refget/', ''),
    url: value.url,
    description: value.description
  }));


const TemplateList = () => {
  const history = useNavigate();
  const location = useLocation();
  const [yamlData, setYamlData] = useState<YamlData | null>(null);
  // const [yamlDescData, setYamlDescData] = useState<YamlDescData | null>(null);

  const loadDataFromHash = async (hash: string) => {
    const selectedOption = options.find(option => `#${option.value}` === hash);
    if (selectedOption) {
      try {
        const fullUrl = `https://schema.databio.org/${selectedOption.url}`;
        const response = await fetch(fullUrl);
        const yamlContent = await response.text();
        const parsedYaml = jsYaml.load(yamlContent) as YamlData;
        setYamlData(parsedYaml);
        // setYamlDescData({ description: selectedOption.description });
      } catch (error) {
        console.error('Error loading YAML file:', error);
      }
    }
  };

  // Load data based on initial hash on page load
  useEffect(() => {
    loadDataFromHash(location.hash);
  }, [location.hash]);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = async (selectedOption: any) => {
    try {
      const fullUrl = `https://schema.databio.org/${selectedOption.url}`;
      const response = await fetch(fullUrl);
      const yamlContent = await response.text();
      const parsedYaml = jsYaml.load(yamlContent) as YamlData;
      setYamlData(parsedYaml);
      // setYamlDescData(selectedOption.description);
      history(`#${selectedOption.value}`);
    } catch (error) {
      console.error('Error loading YAML file:', error);
    }
  };

  const yamlString = JSON.stringify(yamlData, null, 2);
  // const yamlDescString = JSON.stringify(yamlDescData, null, 2);

  return (
    <div>
      <div>
        <h1>Refget Templates</h1>
        <h3>Search below to find templates that belong to Refget</h3>
      </div>
      <div>
        <Select
          options={options}
          onChange={handleChange}
          value={options.find(option => `#${option.value}` === location.hash)}
        />
      </div>
      <div className="mt-3">
          {yamlString !== 'null' && ( 
            <>
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
