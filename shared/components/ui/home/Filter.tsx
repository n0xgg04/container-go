import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { Button, Stack, Typography } from '@/shared/components/base';
import Input from '@/shared/components/base/Input';
import { useTheme } from '@/shared/hooks';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import { Fonts } from '@/shared/constants/themes';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from '@/assets/images/svg/DatePicker';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { useSetRecoilState } from 'recoil';
import { FilterDateAtom } from '@/states/recoil/atoms/FilterDateAtom';
import useFilterDateState from '@/states/hooks/useFilterDateState';
import useDropdownDashboardState from '@/states/hooks/useDropdownDashboardState';
import { useEffect } from 'react';

export default function Filter() {
  const { colors } = useTheme();
  const router = useRouter();
  const setFilterAtom = useSetRecoilState(FilterDateAtom);
  const [{ fromDate: from, toDate: to }] = useFilterDateState();
  const [index] = useDropdownDashboardState();

  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const [showFromPicker, setShowFromPicker] = React.useState(false);
  const [showToPicker, setShowToPicker] = React.useState(false);

  // function convertToISODate(input: string) {
  //   const [year, day, month] = input.split('-');
  //   const correctDate = `${year}-${month}-${day}`;

  //   return correctDate;
  // }

  useEffect(() => {
    switch (index) {
      case 0:
        setFromDate(new Date());
        setToDate(new Date());
        break;

      case 1:
        setFromDate(moment().startOf('isoWeek').toDate());
        setToDate(moment().endOf('isoWeek').toDate());
        break;

      case 2:
        setFromDate(moment().startOf('month').toDate());
        setToDate(moment().endOf('month').toDate());
        break;

      case 3:
        setFromDate(moment().startOf('year').toDate());
        setToDate(moment().endOf('year').toDate());
        break;
    }
  }, [index]);

  React.useEffect(() => {
    to && setToDate(moment(to).toDate());
    from && setFromDate(moment(from).toDate());
  }, [from, to]);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleFromDatePicker = () => setShowFromPicker(!showFromPicker);
  const toggleToDatePicker = () => setShowToPicker(!showToPicker);

  const onFromChange = ({ type }: any, selectedDate: Date | undefined) => {
    if (type === 'set' && selectedDate) {
      setFromDate(selectedDate);
      if (Platform.OS === 'android') toggleFromDatePicker();
    } else {
      toggleFromDatePicker();
    }
  };

  const onToChange = ({ type }: any, selectedDate: Date | undefined) => {
    if (type === 'set' && selectedDate) {
      setToDate(selectedDate);
      if (Platform.OS === 'android') toggleToDatePicker();
    } else {
      toggleToDatePicker();
    }
  };

  const confirmIOSDate = () => {
    if (showFromPicker) {
      setShowToPicker(true);
    } else {
      setShowToPicker(false);
    }
    setShowFromPicker(false);
  };

  const handleGoBack = () => {
    router.back();
    // router.push('/container');
  };

  return (
    <Scaffold>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleGoBack} />}>
        Bộ lọc
      </Scaffold.AppBar>
      <Scaffold.MainBox>
        <Stack direction="column" gap={Spacing.SPACING_24}>
          <Stack direction="column" gap={Spacing.SPACING_8}>
            <Typography weight="bold" color="black">
              Từ ngày
            </Typography>
            {!showFromPicker && (
              <TouchableOpacity
                onPress={toggleFromDatePicker}
                style={styles.touchable}
              >
                <Input
                  onPress={(e) => {
                    e.preventDefault();
                    toggleFromDatePicker();
                  }}
                  value={formatDate(fromDate)}
                  leftSection={<DatePicker />}
                  placeholder="DD/MM/YYYY"
                  containerStyle={{
                    borderWidth: 1,
                    borderColor: colors.borderGray,
                    ...styles.shadow,
                  }}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            {showFromPicker && (
              <>
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={fromDate}
                  locale="vi-VN"
                  onChange={onFromChange}
                  textColor={colors.black}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'white' }]}
                    onPress={toggleFromDatePicker}
                  >
                    <Typography style={styles.buttonText}>Huỷ</Typography>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={confirmIOSDate}
                  >
                    <Typography style={[styles.buttonText, { color: 'white' }]}>
                      Chọn
                    </Typography>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Stack>

          <Stack direction="column" gap={Spacing.SPACING_8}>
            <Typography weight="bold" color="black">
              Đến ngày
            </Typography>
            {!showToPicker && (
              <TouchableOpacity
                onPress={toggleToDatePicker}
                style={styles.touchable}
              >
                <Input
                  onPress={(e) => {
                    e.preventDefault();
                    toggleToDatePicker();
                  }}
                  value={formatDate(toDate)}
                  leftSection={<DatePicker />}
                  placeholder="DD/MM/YYYY"
                  containerStyle={{
                    borderWidth: 1,
                    borderColor: colors.borderGray,
                    ...styles.shadow,
                  }}
                  editable={false}
                />
              </TouchableOpacity>
            )}
            {showToPicker && (
              <>
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={toDate}
                  locale="vi-VN"
                  onChange={onToChange}
                  textColor={colors.black}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'white' }]}
                    onPress={toggleToDatePicker}
                  >
                    <Typography style={styles.buttonText}>Huỷ</Typography>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={confirmIOSDate}
                  >
                    <Typography style={[styles.buttonText, { color: 'white' }]}>
                      Chọn
                    </Typography>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Stack>

          <Button
            style={[styles.btn, styles.loginBtn]}
            labelStyle={[styles.btnLabelLogin]}
            onPress={() => {
              confirmIOSDate();
              setFilterAtom({
                fromDate: moment(fromDate.getTime()).format('YYYY-MM-DD'),
                toDate: moment(toDate.getTime()).format('YYYY-MM-DD'),
              });
              router.back();
            }}
          >
            Áp dụng
          </Button>
        </Stack>
      </Scaffold.MainBox>
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.16,
    shadowRadius: 2.22,
    elevation: 3,
  },
  touchable: {
    paddingVertical: Spacing.SPACING_8,
  },
  btnLabelLogin: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: FontSize.FONT_SIZE_16,
    color: 'white',
    fontFamily: Fonts.Bold,
  },
  loginBtn: {
    height: Spacing.SPACING_51,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.SPACING_10,
  },
  btn: {
    marginTop: Spacing.SPACING_20,
    height: Spacing.SPACING_40,
    borderRadius: Spacing.SPACING_10,
  },
  button: {
    flex: 1,
    marginHorizontal: Spacing.SPACING_5,
    paddingVertical: Spacing.SPACING_10,
    borderRadius: Spacing.SPACING_8,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'medium',
    fontSize: FontSize.FONT_SIZE_16,
    color: 'green',
  },
});
