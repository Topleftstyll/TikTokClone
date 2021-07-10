type ImageProps = {
    url: string,
    x: number,
    y: number,
    description: Text
}

export default function({ url, x, y, description }: ImageProps) {
    return(
        <div>
            <img src={url} width={x} height={y} />
            <p>{description}</p>
        </div>
    );
};