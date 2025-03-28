interface IconProps {
  id: IconId;
  size?: number;
  className?: string;
}

function Icon({ id, size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} aria-hidden={true}>
      <use xlinkHref={`/stack.svg#${id}`} />
    </svg>
  );
}

export default Icon;

export type IconId =
  | 'add'
  | 'arror_left'
  | 'arrow_bottom'
  | 'arrow_circle_left'
  | 'arrow_circle_right'
  | 'arrow_right'
  | 'arrow_top'
  | 'calendar'
  | 'checkbox_off'
  | 'checkbox_on'
  | 'chevron_bottom'
  | 'chevron_left'
  | 'chevron_right'
  | 'chevron_top'
  | 'close'
  | 'customer'
  | 'delete'
  | 'drag_handle'
  | 'drag_indicator'
  | 'dropdown_off'
  | 'dropdown_on'
  | 'favorite_off'
  | 'favorite_on'
  | 'image'
  | 'location'
  | 'map'
  | 'map_search'
  | 'more'
  | 'page_first'
  | 'page_last'
  | 'radio_off'
  | 'radio_on'
  | 'replay'
  | 'review'
  | 'search'
  | 'share'
  | 'time'
  | 'visibillity_-1'
  | 'visibillity_';
