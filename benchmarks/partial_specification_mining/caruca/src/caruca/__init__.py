from caruca.cli import setup_argparser


def main():
    args = setup_argparser()
    args.func(args)


if __name__ == "__main__":
    main()
