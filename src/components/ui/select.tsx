import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  Props as SelectProps,
  StylesConfig,
  Theme,
} from 'react-select';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CustomSelectProps
  extends Omit<
    SelectProps<SelectOption, false, GroupBase<SelectOption>>,
    'styles' | 'theme'
  > {
  error?: boolean;
  maxMenuHeight?: number;
}

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, false, GroupBase<SelectOption>>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronsUpDown className='w-4 h-4 opacity-50' />
    </components.DropdownIndicator>
  );
};

export function CustomSelect({
  error = false,
  maxMenuHeight = 200,
  menuPlacement = 'auto',
  isSearchable = true,
  isClearable = false,
  ...props
}: CustomSelectProps) {
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(
    null
  );

  React.useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  // Add wheel event handler for manual scrolling
  React.useEffect(() => {
    let isScrolling = false;
    let animationFrameId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const handleWheel = (e: WheelEvent) => {
      const menuList = document.querySelector('.select__menu-list');
      if (!menuList || !(e.target as HTMLElement).closest('.select__menu-list'))
        return;

      e.preventDefault();
      if (isScrolling) {
        cancelAnimationFrame(animationFrameId);
      }

      const scrollSpeed = 0.8;
      const duration = 300; // ms
      const startTime = performance.now();
      const startScroll = menuList.scrollTop;
      const targetDelta = e.deltaY * scrollSpeed;
      const targetScroll = Math.max(
        0,
        Math.min(
          startScroll + targetDelta,
          menuList.scrollHeight - menuList.clientHeight
        )
      );

      const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);

        menuList.scrollTop =
          startScroll + (targetScroll - startScroll) * easeProgress;

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(scroll);
          isScrolling = true;
        } else {
          isScrolling = false;
        }
      };

      animationFrameId = requestAnimationFrame(scroll);
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const selectStyles: StylesConfig<SelectOption, false> = React.useMemo(
    () => ({
      control: (base, state) => ({
        ...base,
        minHeight: '40px',
        backgroundColor: 'hsl(var(--background))',
        border: error
          ? '1px solid hsl(var(--destructive))'
          : '1px solid hsl(var(--input-border))',
        borderRadius: '6px',
        boxShadow: 'none',
        transition: 'all 150ms ease',
        '&:hover': state.isDisabled
          ? {}
          : {
              borderColor: error
                ? 'hsl(var(--destructive))'
                : 'hsl(var(--input-border-hover))',
            },
        '&:focus-within': {
          outline: 'none',
          borderColor: error
            ? 'hsl(var(--destructive))'
            : 'hsl(var(--input-border-focus))',
          boxShadow: error
            ? '0 0 0 1px hsl(var(--destructive))'
            : '0 0 0 1px hsl(var(--ring))',
        },
        ...(state.isDisabled && {
          cursor: 'not-allowed',
          backgroundColor: 'hsl(var(--input-disabled-background))',
          borderColor: 'hsl(var(--input-border))',
          color: 'hsl(var(--input-disabled-text))',
          '& *': {
            color: 'hsl(var(--input-disabled-text)) !important',
          },
        }),
      }),
      menu: (base) => ({
        ...base,
        padding: '4px',
        backgroundColor: 'hsl(var(--background))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '6px',
        boxShadow: 'var(--shadow)',
        zIndex: 9999,
      }),
      menuPortal: (base) => ({
        ...base,
        zIndex: 9999,
      }),
      menuList: (base) => ({
        ...base,
        padding: '4px',
        maxHeight: maxMenuHeight,
        minHeight: 35,
        overflowY: 'auto',
        paddingTop: 0,
        paddingBottom: 0,
        scrollBehavior: 'auto',
        pointerEvents: 'auto',
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: 'hsl(var(--muted))',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'hsl(var(--muted-foreground))',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'hsl(var(--foreground))',
        },
      }),
      option: (base, state) => ({
        ...base,
        padding: '6px 12px',
        borderRadius: '6px',
        marginBottom: '4px',
        backgroundColor: state.isSelected
          ? 'hsl(var(--secondary))'
          : state.isFocused
          ? 'hsl(var(--accent))'
          : 'transparent',
        color: state.isSelected
          ? 'hsl(var(--secondary-foreground))'
          : 'hsl(var(--foreground))',
        cursor: state.isDisabled ? 'default' : 'pointer',
        fontSize: '14px',
        fontWeight: state.isSelected ? '500' : '400',
        opacity: state.isDisabled ? 0.5 : 1,
        '&:hover': {
          backgroundColor: state.isSelected
            ? 'hsl(var(--secondary))'
            : 'hsl(var(--accent))',
        },
        '&:active': {
          backgroundColor: 'hsl(var(--accent))',
        },
        userSelect: 'none',
      }),
      input: (base, state) => ({
        ...base,
        color: state.isDisabled
          ? 'hsl(var(--input-disabled-text))'
          : 'hsl(var(--foreground))',
        fontSize: '14px',
        margin: '0',
        padding: '0',
      }),
      singleValue: (base, state) => ({
        ...base,
        color: state.isDisabled
          ? 'hsl(var(--input-disabled-text))'
          : 'hsl(var(--foreground))',
        fontSize: '14px',
        margin: '0',
        padding: '0',
      }),
      placeholder: (base, state) => ({
        ...base,
        color: state.isDisabled
          ? 'hsl(var(--input-disabled-text))'
          : 'hsl(var(--muted-foreground))',
        fontSize: '14px',
      }),
      valueContainer: (base) => ({
        ...base,
        padding: '0px 12px',
        paddingTop: '0px',
        paddingBottom: '4px',
      }),
      indicatorsContainer: (base) => ({
        ...base,
        padding: '2px 8px',
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
      clearIndicator: (base) => ({
        ...base,
        padding: '4px',
        color: 'hsl(var(--muted-foreground))',
        cursor: 'pointer',
        '&:hover': {
          color: 'hsl(var(--foreground))',
        },
      }),
      loadingMessage: (base) => ({
        ...base,
        color: 'hsl(var(--muted-foreground))',
        fontSize: '14px',
      }),
      noOptionsMessage: (base) => ({
        ...base,
        color: 'hsl(var(--muted-foreground))',
        fontSize: '14px',
      }),
    }),
    [error]
  );

  const customTheme = (theme: Theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: 'hsl(var(--primary))',
      primary75: 'hsl(var(--primary))',
      primary50: 'hsl(var(--primary))',
      primary25: 'hsl(var(--primary))',
    },
    spacing: {
      ...theme.spacing,
      controlHeight: 40,
      baseUnit: 4,
    },
    borderRadius: 6,
  });

  return (
    <Select<SelectOption>
      {...props}
      menuPlacement={menuPlacement}
      maxMenuHeight={maxMenuHeight}
      menuPortalTarget={portalTarget}
      menuPosition='fixed'
      closeMenuOnScroll={false}
      captureMenuScroll={false}
      blurInputOnSelect={true}
      isSearchable={isSearchable}
      isClearable={isClearable}
      components={{ DropdownIndicator }}
      styles={selectStyles}
      classNames={{
        control: () => 'select__control',
        menu: () => 'select__menu',
        menuList: () => 'select__menu-list',
        option: () => 'select__option',
      }}
      classNamePrefix='select'
      theme={customTheme}
    />
  );
}
