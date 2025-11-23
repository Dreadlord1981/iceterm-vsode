import "../scss/List.scss";

function List(props) {

	let o_state = props.state;

	let a_items = o_state.items || [];

	let a_elements = a_items.map(function(o_item) {
		return(
			<li key={o_item.id} name={o_item.id} className="list-item">
				<span className="flex-center pf-console_network"></span>
				<span className="list-item-title flex-center">{o_item.title}</span>
				<span className="flex-1 none-select"></span>
				<span title="Edit" className="list-item-action pf-gearwheel flex-center" onClick={props.onItemEdit}></span>
				<span title="Open" className="list-item-action pf-monitor flex-center" onClick={props.onItemRun}></span>
			</li>
		)
	});

	return (
		<div className="list">
			<ul className="list-items">
				{a_elements}
			</ul>
		</div>
	)
};

export default List;