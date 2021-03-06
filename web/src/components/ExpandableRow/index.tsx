import React, { useState } from 'react';

import s from './ExpandableRow.module.scss';
import { Arrow } from 'src/components/Icon/Arrow';

interface ExpandableRowProps {
    cssClass: string;
    children: Array<React.ReactElement>;
}

export function ExpandableRow(props: ExpandableRowProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={props.cssClass} style={expanded ? { flex: 4 } : {}}>
            <h2 className={s.title} onClick={() => setExpanded((f) => !f)}>
                <Arrow direction={expanded ? 'down' : 'up'} />
            </h2>
            {props.children}
        </div>
    );
}
