import React from 'react';

interface ViewerProps {
    readonly file: string;
}

function Viewer(props: ViewerProps): JSX.Element {
    const src = `https://docs.google.com/gview?url=${props.file}&embedded=true`;
    const style = { height: '100%', width: '100%' };

    return <iframe src={src} style={style} frameBorder="0" title="gview" />;
}

export default Viewer;
