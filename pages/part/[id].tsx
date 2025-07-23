const router = useRouter();
  const { id } = router.query;
  const [part, setPart] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/parts/${id}`).then(res => res.json()).then(setPart);
    }
  }, [id]);

  if (!part) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 32 }}>
      <h1>{part.name}</h1>
      <img src={part.image_url} alt={part.name} width={200} />
      <p>{part.description || 'No description available.'}</p>
      <a href={part.affiliate_link} target="_blank" rel="noopener noreferrer">Buy Now</a>
    </div>
  );
}
