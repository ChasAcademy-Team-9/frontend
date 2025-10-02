interface InfoCardProps {
     title: string;
     items: { label: string; value: string }[];
}

const InfoCard = ({ title, items }: InfoCardProps) => {
     return (
          <div className="bg-secondary/80 rounded-2xl p-7">
               <h3 className="font-semibold text-text-dark mb-3">{title}</h3>
               <div className="space-y-2">
                    {items.map((item, index) => (
                         <div key={index} className="flex justify-between items-center">
                              <span className="text-sm text-text-dark/70">{item.label}</span>
                              <span className="text-sm font-medium text-text-dark">{item.value}</span>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default InfoCard;