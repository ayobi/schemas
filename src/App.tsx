import './App.css'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function App() {
  
  interface SchemaOption {
    value: string;
    label: string;
  }
  
  const schemaOptions: SchemaOption[] = [
    { value: '/bulker', label: 'Bulker' },
    { value: '/pep', label: 'Pep' },
    { value: '/pipelines', label: 'Pipelines' },
    { value: '/refgenie', label: 'Refgenie' },
    { value: '/refget', label: 'Refget' },
  ];

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (selectedOption: any) => {
    navigate(selectedOption.value)
  };

  return (
    <>
      <div>
        <div>
          <h1>Lab schemas</h1>
        </div>
        <h2>About</h2>

        Here you'll find an API for databio lab schemas like bulker, pep, pipelines, refgenie, refget, etc.

        <h2>Contributing a schema</h2>

        <h4>Write a schema</h4>

        <p>First, you have to write a schema yaml file. It should follow json-schema format.</p>

        <h4>Upload your schema</h4>

        <p>After creating your schema file, you can contribute it to this repository so that you and others can more easily load it. Name your schema yaml file with the name of the schema. Schemas in the registry are divided into namespaces, which are represented as subfolders in this repository. So, place your schema into an appropriate subfolder, and then open a pull request.</p>

        <h2>Search schema categories below</h2>

        <Select
          options={schemaOptions}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default App
