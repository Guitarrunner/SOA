

const putData = async (URL, data = {}) => {
    const response = await fetch(URL,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    return response.json

    }

export default putData;