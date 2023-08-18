interface IProcessNextChunkParams {
	reader: ReadableStreamDefaultReader<Uint8Array>;
	accumulatedData: string;
	setChunks: (srt: (prevChunks: string) => string) => void;
}

export const processNextChunk = async ({ reader, accumulatedData, setChunks }: IProcessNextChunkParams) => {
	try {
		const { value } = await reader.read();

		accumulatedData += new TextDecoder().decode(value);
		const chunksArray = accumulatedData.split('}{');
		if (chunksArray.length > 1) {
			const chunk = chunksArray[0] + '}';
			accumulatedData = accumulatedData.slice(chunk.length);

			const chunkObject = JSON.parse(chunk);
			console.log('chunkObject', chunkObject);

			setChunks((prevChunks) => prevChunks + chunkObject.value);
		} else {
			setChunks((_) => '');
			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 100));

		await processNextChunk({ reader, accumulatedData, setChunks });
	} catch (error) {
		console.error('Ошибка обработки чанка:', error);
	}
};
