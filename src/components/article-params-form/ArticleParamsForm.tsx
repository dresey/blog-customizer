import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import type { ArticleStateType, OptionType } from '@/constants/articleProps.ts';
import type { FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        event.target instanceof Node &&
        !formContainerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (!isOpen) {
      return;
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleApply = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  const handleFontFamilyChange = (fontFamilyOption: OptionType): void => {
    setFormState((currentState) => ({ ...currentState, fontFamilyOption }));
  };

  const handleFontSizeChange = (fontSizeOption: OptionType): void => {
    setFormState((currentState) => ({ ...currentState, fontSizeOption }));
  };

  const handleFontColorChange = (fontColor: OptionType): void => {
    setFormState((currentState) => ({ ...currentState, fontColor }));
  };

  const handleBackgroundColorChange = (backgroundColor: OptionType): void => {
    setFormState((currentState) => ({ ...currentState, backgroundColor }));
  };

  const handleContentWidthChange = (contentWidth: OptionType): void => {
    setFormState((currentState) => ({ ...currentState, contentWidth }));
  };

  return (
    <div ref={formContainerRef}>
      <ArrowButton
        isOpen={isOpen}
        onClick={() => setIsOpen((currentState) => !currentState)}
      />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={handleFontFamilyChange}
          />
          <RadioGroup
            title="Размер шрифта"
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFontSizeChange}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={handleFontColorChange}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={handleBackgroundColorChange}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={handleContentWidthChange}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
