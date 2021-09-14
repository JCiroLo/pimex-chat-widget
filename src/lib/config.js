const getConfig = async (boardId) => {
    // eslint-disable-next-line no-undef
    const query = await db.collection('boards').where('boardId', '==', boardId).limit(1).get()
    if (!query.empty) {
        return query.docs[0].data().config
    }
    console.log("No document corresponding to the query!");
    return null;
}
export {
    getConfig
}
