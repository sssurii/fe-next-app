import Spinner from './spinner';
type LoaderProps = {
  width?: string;
  height?: string;
  position?: 'fixed' | 'absolute' | 'relative' | 'sticky' | 'static';
};
export const Loader = ({
  width = 'w-screen', height = 'h-screen', position = 'fixed',
}: LoaderProps) => {
  return (
    <div className={`${width} ${height} ${position} top-0 left-0 z-[999] flex
     items-center justify-center bg-loader-background opacity-0 animate-showLoader`}>
      <Spinner />
    </div>
  );
};

export default Loader;
