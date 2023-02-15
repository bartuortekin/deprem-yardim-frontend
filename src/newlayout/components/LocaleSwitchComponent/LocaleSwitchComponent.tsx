//#region imports
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//#endregion
//#region interfaces
interface IStyles {
  [key: string]: SxProps<Theme>;
}
//#endregion
//#region component
export const LocaleSwitchComponent = () => {
  const router = useRouter();
  const { locales, locale: activeLocale, reload } = router;
  const [activeState, setactiveState] = useState(activeLocale);

  const setCookie = (_locale: string) => {
    document.cookie = `NEXT_LOCALE=${_locale}; max-age=31536000; path=/`;
  };
  const handleChange = (event: SelectChangeEvent) => {
    setactiveState(event.target.value as string);
    reload();
  };

  useEffect(() => {
    if (activeLocale) {
      setactiveState(activeLocale);
      setCookie(activeLocale);
    }
    // do not add `reload` to the dependency array because it will cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLocale]);

  return (
    <Box sx={styles.select}>
      <FormControl sx={styles.select}>
        <Select
          sx={styles.select}
          value={activeState}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {locales?.map((_locale, index) => (
            <MenuItem key={`locale-select-item-${index}`} value={_locale}>
              {_locale === "en" ? "English" : "Türkçe"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
//#endregion
//#region styles
const styles: IStyles = {
  select: {
    width: "100px",
    height: "42px",
    backgroundColor: "white",
    fontSize: "14px",
    fontWeight: "400",
  },
};
//#endregion
