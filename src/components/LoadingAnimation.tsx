function LoadingAnimation() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4'>
      <div className='w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin'></div>
      <p>Laddar...</p>
    </div>
  );
}

export default LoadingAnimation;
