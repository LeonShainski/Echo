import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
const supabase = createClient(supabaseUrl, supabaseKey)

function ArticleScreen() {

    const [articles, setArticles] = useState(() => fetchArticles());

    async function fetchArticles() {
        
        const artList = await supabase
            .from('articles')
            .select('*')
        
        arts = [];
        for (const key in artList.data) {
            const artobj = {
                id: artList.data[key].id,
                title: artList.data[key].title,
                img: artList.data[key].img,
            };
           
            arts.push(artobj);
    
        }
        setArticles(arts);
    }

};




export default ArticleScreen;