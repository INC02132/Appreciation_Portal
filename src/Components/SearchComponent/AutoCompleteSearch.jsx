import { SearchOutlined } from '@mui/icons-material';
import { Autocomplete, ListItem, ListItemText, TextField } from '@mui/material';
import React from 'react'

const AutoCompleteSearch = ({autoCompleteonChange, textOnChange, options, getOptionLabel="", firstNameOption="", lastNameOption="", primaryTextOption="", secondaryTextOption, placeholder="", width="17em" }) => {
  return (
    <Autocomplete
    sx={{width: width}}
              onChange={(event, value) => {
                autoCompleteonChange(value)
              }}
              options={options}
              getOptionLabel={(option) => getOptionLabel!=="" ?option[getOptionLabel] : `${option[firstNameOption]} ${option[lastNameOption]}`}
              freeSolo
              disableClearable
              renderOption={(props, option) => (
                <ListItem {...props}>
                  <ListItemText
                    primary={firstNameOption!=="" ? `${option[firstNameOption]} ${option[lastNameOption]}` : primaryTextOption!==""? option[primaryTextOption] : option}
                    secondary={option[secondaryTextOption]}
                  />
                </ListItem>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder={placeholder}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      style: {
                        padding: "0px 4px",
                        width: "93%",
                      },
                      endAdornment: <SearchOutlined color="disabled"/>,
                    }}
                    onChange={(e) => textOnChange(e.target.value)}
                  />
                );
              }}
            />
  )
}

export default AutoCompleteSearch