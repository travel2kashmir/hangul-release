export default function handlecheckbox(e,messagesFiltered,setMessagesFiltered) {
    console.log(e.target)
    const { name, checked } = e.target;
    if (name === "allSelect") {
        let tempCon = messagesFiltered.map((item) => {
            return { ...item, isChecked: checked }
        });
        setMessagesFiltered(tempCon)
    }
    else {
        let tempCon = messagesFiltered.map((item) =>
            item.message_id === name ? { ...item, isChecked: checked } : item
        );
        setMessagesFiltered(tempCon)
    }

}
