import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import '../components/styles/ReadMe.css';

const ReadMe = ({ readme }) => {
  return (
    <div className="read_me__markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ src, alt }) => (
            <img src={src} alt={alt} style={{ maxWidth: '100%' }} />
          ),
        }}
      >
        {readme}
      </ReactMarkdown>
    </div>
  );
};

export default ReadMe;
