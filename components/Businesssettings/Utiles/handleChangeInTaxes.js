export default function handleChangeInTaxes(e, index, keyItem,setTaxes) {
    setTaxes(prev => {
        return prev.map((item) => {
            return item.index === index ? { ...item, [keyItem]: e.target.value } : item;
        }).sort((a, b) => a.index - b.index);
    });
};