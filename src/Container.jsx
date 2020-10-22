import React, { memo } from 'react';
import { SourceBox } from './SourceBox';
import { StatefulTargetBox as TargetBox } from './TargetBox';
import { Colors } from './Colors';
export const Container = memo(function Container() {
    return (<>
			<div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
				<div style={{ float: 'left' }}>
					<TargetBox>
					</TargetBox>
				</div>
				<div style={{ float: 'left', marginLeft: '5rem', marginTop: '.5rem' }}>
					 <TargetBox/>
				</div>
			</div>
		</>);
});
