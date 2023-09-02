import { CurrencyRupee } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

type Props = {};

const today = new Date();
const HomeScreen = (props: Props) => {
  const [calculatedPrice, setCalculatedPrice] = React.useState<number | null>(
    null
  );
  const [productAgeInMonths, setProductAgeInMonths] = React.useState<
    number | null
  >(null);

  const warrantyForm = useFormik({
    initialValues: {
      dateOfPurchase: null,
      totalWarranty: 0,
      freeReplacementWarranty: 0,
      productPrice: 0,
    },
    validationSchema: Yup.object({
      dateOfPurchase: Yup.string().required("Date of purchase is required"),
      totalWarranty: Yup.number()
        .required("Total warranty is required")
        .min(6, "Total warranty should be greater than 6 months"),
      freeReplacementWarranty: Yup.number()
        .required("Free replacement warranty is required")
        .min(6, "Free replacement warranty should be greater than 6 months"),
      productPrice: Yup.number()
        .required("Product price is required")
        .min(100, "Product price should be greater than 100"),
    }),
    onSubmit: (values) => {
      const productAgeInMonths =
        (today.getFullYear() - values.dateOfPurchase.getFullYear()) * 12 +
        (today.getMonth() - values.dateOfPurchase.getMonth());

      setProductAgeInMonths(productAgeInMonths);

      if (
        productAgeInMonths > values.freeReplacementWarranty &&
        productAgeInMonths <= values.totalWarranty
      ) {
        const payablePrice =
          (productAgeInMonths / values.totalWarranty) * values.productPrice;
        setCalculatedPrice(payablePrice);
      } else if (productAgeInMonths <= values.freeReplacementWarranty) {
        setCalculatedPrice(0);
      } else {
        setCalculatedPrice(values.productPrice);
      }
    },
  });

  return (
    <div className="p-4 flex justify-center">
      <form
        className="flex flex-col gap-4 max-w-[400px] w-full"
        onSubmit={warrantyForm.handleSubmit}
      >
        <div>
          <Typography variant="h5" className="!font-bold">
            Pro Warranty Calc.
          </Typography>
        </div>
        <div>
          <DatePicker
            views={["year", "month", "day"]}
            sx={{ width: "100%" }}
            label="Date of purchase"
            maxDate={today}
            value={warrantyForm.values.dateOfPurchase}
            onChange={(date) =>
              warrantyForm.setFieldValue("dateOfPurchase", date)
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            {...warrantyForm.getFieldProps("totalWarranty")}
            label="Total warranty in Months"
            error={
              warrantyForm.touched.totalWarranty &&
              Boolean(warrantyForm.errors.totalWarranty)
            }
            helperText={
              warrantyForm.touched.totalWarranty &&
              warrantyForm.errors.totalWarranty
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            {...warrantyForm.getFieldProps("freeReplacementWarranty")}
            label="Free replacement warranty in Months"
            error={
              warrantyForm.touched.freeReplacementWarranty &&
              Boolean(warrantyForm.errors.freeReplacementWarranty)
            }
            helperText={
              warrantyForm.touched.freeReplacementWarranty &&
              warrantyForm.errors.freeReplacementWarranty
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            {...warrantyForm.getFieldProps("productPrice")}
            label="Product MRP"
            InputProps={{
              endAdornment: <CurrencyRupee />,
            }}
            error={
              warrantyForm.touched.productPrice &&
              Boolean(warrantyForm.errors.productPrice)
            }
            helperText={
              warrantyForm.touched.productPrice &&
              warrantyForm.errors.productPrice
            }
          />
        </div>
        <div>
          <Button type="submit" size={"large"} variant={"contained"} fullWidth>
            Calculate
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <div className="border flex-1"></div>
          <Typography className="px-2 text-gray-300">Calculations</Typography>
          <div className="border flex-1"></div>
        </div>
        <div>
          {productAgeInMonths && productAgeInMonths >= 0 ? (
            <Typography variant={"h6"}>
              Product age: {productAgeInMonths} (in months)
            </Typography>
          ) : null}
          {calculatedPrice || calculatedPrice === 0 ? (
            <Typography variant={"h6"} className="flex items-center">
              Payable price: <i className="material-icons">currency_rupee</i>
              {calculatedPrice.toFixed(2)}
            </Typography>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default HomeScreen;
