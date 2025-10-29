const fs = require('fs');
const path = require('path');
const Minio = require('minio');
const cssPackage = require('./dist-css/package.json');

const accessKey = process.argv[2];
const secretKey = process.argv[3];

const minioClient = new Minio.Client({
    endPoint: 's3-cluster-11.cdek.ru',
    port: 443,
    useSSL: true,
    accessKey,
    secretKey
});

const bucketName = 'ek5-common';
const folderPath = path.join(__dirname, 'dist-css/css');
const version = cssPackage.version;

async function uploadFile(fileName) {
    const filePath = path.join(folderPath, fileName, 'theme.min.css');
    const metaData = {
        'Content-Type': 'text/css',
    };
    const minioPath = `ng-themes/${fileName.replace('.min.css', '')}/${version}/theme.min.css`

    try {
        await minioClient.fPutObject(bucketName, minioPath, filePath, metaData);
        console.log(`Файл ${fileName} успешно загружен в бакет ${bucketName}`);
    } catch (err) {
        console.error(`Ошибка при загрузке файла ${fileName}:`, err);
    }
}

async function uploadAllFiles() {
    try {
        const bucketExists = await minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            await minioClient.makeBucket(bucketName);
            console.log(`Бакет ${bucketName} создан`);
        }

        const files = fs.readdirSync(folderPath).filter(i => i.includes('.min.css'));

        if (files.length === 0) {
            console.log('В папке css нет файлов для загрузки');
            return;
        }

        console.log(`Найдено ${files.length} файлов для загрузки`);

        for (const file of files) {
            await uploadFile(file);
        }

        console.log('Все файлы обработаны');
    } catch (err) {
        console.error('Ошибка:', err);
    }
}

uploadAllFiles();
