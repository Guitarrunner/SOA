

const deleteData = async (URL, data = {}) => {
    const response = await fetch(URL,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    return response.json

    }

export default deleteData;