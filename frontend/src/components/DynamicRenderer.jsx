import FormComponent from './blocks/FormComponent';
import TextComponent from './blocks/TextComponent';
import ImageComponent from './blocks/ImageComponent';

const componentMap = {
  form: FormComponent,
  text: TextComponent,
  image: ImageComponent,
};

function DynamicRenderer({ schema }) {
  if (!schema || !schema.type) {
    return <RenderError message="No schema or type provided." />;
  }

  const ComponentToRender = componentMap[schema.type];

  if (!ComponentToRender) {
    return <RenderError message={`Component type "${schema.type}" is not supported.`} />;
  }

  return (
    <div className="w-full h-full">
       <h2 className="text-lg font-semibold text-gray-700 mb-2">Live Preview</h2>
       <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg h-full">
         <ComponentToRender {...schema} />
       </div>
    </div>
  );
}

const RenderError = ({ message }) => (
  <div className="flex items-center justify-center h-full bg-gray-50 border border-dashed border-gray-300 rounded-lg">
    <p className="text-gray-500">{message}</p>
  </div>
);

export default DynamicRenderer;