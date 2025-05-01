interface IconProps {
  id: IconId;
  size?: number;
  className?: string;
}

function Icon({ id, size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={true}
    >
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
  );
}

export default Icon;

export type IconId =
  | 'add'
  | 'arrow_left'
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
  | 'visibillity_on'
  | 'visibillity_off'
  | 'polzzak'
  | 'food'
  | 'festival'
  | 'tour'
  | 'leports'
  | 'shopping'
  | 'hotels'
  | 'cultural';
