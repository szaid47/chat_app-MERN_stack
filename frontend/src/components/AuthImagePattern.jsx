const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-12 text-white">
      <div className="max-w-md text-center">
        {/* Animated Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl transition-transform duration-300 ${
                i % 2 === 0
                  ? "bg-white/20 hover:scale-110"
                  : "bg-white/30 hover:rotate-6"
              }`}
            />
          ))}
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-3xl font-extrabold mb-4 drop-shadow-md">{title}</h2>
        <p className="text-lg opacity-90">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
