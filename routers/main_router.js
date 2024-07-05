import {Router} from 'express';
import axios from 'axios';
const router = Router(); //Instanciamos router

router.get('/articles', async (req, res) => {
    const { query,language,page, pageSize,fromDate,toDate  } = req.query;

    // Construir los parámetros de consulta
    const params = {
        action: 'getArticles',
        keyword: query,
        articlesPage: parseInt(page),
        articlesCount: parseInt(pageSize),
        articlesSortBy: 'date',
        articlesSortByAsc: false,
        articlesArticleBodyLen: -1,
        resultType: 'articles',
        dataType: 'news',
        apiKey: process.env.API_KEY, // Asegúrate de tener la clave API en tus variables de entorno
        forceMaxDataTimeWindow: 31,
        lang: language,
        dateStart: fromDate,
        dateEnd: toDate
    };

    try {
        // Realizar la solicitud GET a Event Registry con los parámetros de consulta
        const response = await axios.get('https://eventregistry.org/api/v1/article/getArticles', { params });

        // Enviar los datos de los artículos obtenidos al cliente
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener artículos:', error);
        res.status(500).json({ error: 'Error al obtener artículos de noticias.' });
    }
});

router.get('/breaking-events', async (req, res) => {
    const { language,region,page,pageSize} = req.query;

    // Construir los parámetros de consulta
    const params = {

        eventImageCount: 3,
        includeEventTittle: true,
        includeEventLocation: true,
        includeEventSocialScore: true,
        includeLocationGeoLocation: true,
        breakingEventsPage: page||1,
        breakingEventsCount: pageSize||10,
        conceptoLang: language||'eng',
        apiKey: process.env.API_KEY
      }

    try {
        // Realizar la solicitud GET a Event Registry con los parámetros de consulta
        const response = await axios.get('https://eventregistry.org/api/v1/event/getBreakingEvents', { params });

        // Enviar los datos de los artículos obtenidos al cliente
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener artículos:', error);
        res.status(500).json({ error: 'Error al obtener artículos de noticias.' });
    }
});

router.get('/articles/:id', async (req, res) => {
    const { id } = req.params;

    const params = {
        action: "getArticle",
        articleUri: id,
        infoArticleBodyLen: -1,
        resultType: "info",
        apiKey: process.env.API_KEY
      }

    try {
        // Realizar la solicitud GET a Event Registry con los parámetros de consulta
        const response = await axios.get('https://eventregistry.org/api/v1/article/getArticle', { params });

        // Enviar los datos de los artículos obtenidos al cliente
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener artículos:', error);
        res.status(500).json({ error: 'Error al obtener artículos de noticias.' });
    }



});

export default router